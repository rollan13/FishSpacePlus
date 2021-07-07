// myobject.cc
#include <fstream>

#include "wrapper.h"
#include "model.h"
#include "fishing_agent.h"
#include "parameters.h"

#include <vector>
#include <random>
#include <iostream>
#include <node.h>
#include <v8.h>
#include <uv.h>
#include <string>
#include <algorithm>
#include <chrono>
#include <thread>

/** \file wrapper.cpp
 * \brief This is the interface between the front-end and the C++ API
 */
namespace fishspace {

using v8::Context;
using v8::Function;
using v8::FunctionCallbackInfo;
using v8::FunctionTemplate;
using v8::Isolate;
using v8::Local;
using v8::Number;
using v8::Object;
using v8::Array;
using v8::Persistent;
using v8::String;
using v8::Value;
using v8::Exception;
using v8::Handle;

Persistent<Function> FISHSpace::constructor;

FISHSpace::FISHSpace() : fishspace_model() {}
FISHSpace::~FISHSpace() {}

void FISHSpace::Init(Local<Object> exports) {
  Isolate* isolate = exports->GetIsolate();

  // Prepare constructor template
  Local<FunctionTemplate> tpl = FunctionTemplate::New(isolate, New);
  tpl->SetClassName(String::NewFromUtf8(isolate, "FISHSpace"));
  tpl->InstanceTemplate()->SetInternalFieldCount(1);

  // Prototype
  NODE_SET_PROTOTYPE_METHOD(tpl, "run_timestep", run_timestep);
  NODE_SET_PROTOTYPE_METHOD(tpl, "add_fisher", add_fisher);
  NODE_SET_PROTOTYPE_METHOD(tpl, "shim", shim);

  constructor.Reset(isolate, tpl->GetFunction());
  exports->Set(String::NewFromUtf8(isolate, "FISHSpace"),
               tpl->GetFunction());
}

void FISHSpace::New(const FunctionCallbackInfo<Value>& args) {
  Isolate* isolate = args.GetIsolate();

  if (args.IsConstructCall()) {
    // Invoked as constructor: `new FISHSpace(...)`
    // double value = args[0]->IsUndefined() ? 0 : args[0]->NumberValue();
    FISHSpace* obj = new FISHSpace();
    obj->fishspace_model = FISHSpaceModel();
    obj->Wrap(args.This());
    args.GetReturnValue().Set(args.This());
  } else {
    // Invoked as plain function `FISHSpace(...)`, turn into construct call.
    const int argc = 1;
    Local<Value> argv[argc] = { args[0] };
    Local<Context> context = isolate->GetCurrentContext();
    Local<Function> cons = Local<Function>::New(isolate, constructor);
    Local<Object> result =
        cons->NewInstance(context, argc, argv).ToLocalChecked();
    args.GetReturnValue().Set(result);
  }
}

// Object Methods

/*!
  \brief API function to create the fisher objects used by the model.
  \details This is called by the function addFisherSet() in maps.js (in \\gui\\scripts\\). Using the isolate object, the parameters
  are passed from the front-end Javascript as V8 data types and are converted to native C++ data types via handles.
  \param args A set of parameter objects passed by the Javascript function addFisherSet() in maps.js
  There are 9 arguments/parameters used inside the function (arg0 to arg7):
		"arg0" : fisher type,
		"arg1" : threshold (quota),
		"arg2" : array of home X coordinates,
		"arg3" : array of home Y coordinates,
		"arg4" : range,
		"arg5" : minimum_fishable_ratio1 (biomassThreshold1),
		"arg6" : minimum_fishable_ratio2 (biomassThreshold2),
		"arg7" : biomass1_maxratio_perfisher,
		"arg8" : threshold_perfisher
*/
void FISHSpace::add_fisher(const FunctionCallbackInfo<Value>& args) {
  // function add_fisher(fisher_type, threshold, pos_x, pos_y, numeric_arg);
  // Check the number of arguments passed.
  FISHSpace* obj = ObjectWrap::Unwrap<FISHSpace>(args.Holder());
  Isolate* isolate = args.GetIsolate();
  int fisher_id;
  int home_x;
  int home_y;
  double biomass1_maxratio;

  Local<Object> outputObject = Object::New(isolate);
  v8::String::Utf8Value fisher_arg(isolate, Handle<Object>::Cast(args[0])->Get(String::NewFromUtf8(isolate, "arg0")));
  std::string fisher_type (*fisher_arg);

  // TODO: expose this value to the GUI front-end
  double minimum_fishable_ratio1 = Handle<Object>::Cast(args[0])->Get(String::NewFromUtf8(isolate, "arg5"))->NumberValue();
  double minimum_fishable_ratio2 = Handle<Object>::Cast(args[0])->Get(String::NewFromUtf8(isolate, "arg6"))->NumberValue();
  // TODO: refactor to accept JSON params instead
  //double threshold = Handle<Object>::Cast(args[0])->Get(String::NewFromUtf8(isolate, "arg1"))->NumberValue();
  double threshold = 0;
  //int pos_x = args[2]->NumberValue();
  //int pos_y = args[3]->NumberValue();
  Handle<Array> array_posx = Handle<Array>::Cast(Handle<Object>::Cast(args[0])->Get(String::NewFromUtf8(isolate, "arg2")));
  Handle<Array> array_posy = Handle<Array>::Cast(Handle<Object>::Cast(args[0])->Get(String::NewFromUtf8(isolate, "arg3")));
  Handle<Array> array_travelrange = Handle<Array>::Cast(Handle<Object>::Cast(args[0])->Get(String::NewFromUtf8(isolate, "arg4")));
  Handle<Array> array_maxratio_perfisher = Handle<Array>::Cast(Handle<Object>::Cast(args[0])->Get(String::NewFromUtf8(isolate, "arg7")));
  Handle<Array> array_threshold_perfisher = Handle<Array>::Cast(Handle<Object>::Cast(args[0])->Get(String::NewFromUtf8(isolate, "arg8")));
  Handle<Array> array_fisher_id = Handle<Array>::Cast(Handle<Object>::Cast(args[0])->Get(String::NewFromUtf8(isolate, "arg9")));

  // open a file in write mode.
  std::ofstream outfile;
  outfile.open("wrapper-add_fisher-parameters.csv");
  outfile << "minimum_fishable_ratio1=" << minimum_fishable_ratio1 << std::endl;
  outfile << "minimum_fishable_ratio2=" << minimum_fishable_ratio2 << std::endl;
  outfile << "threshold=" << threshold << std::endl;
  outfile << "fisher_type=" << fisher_type << std::endl;
  //outfile << "range=" << Handle<Object>::Cast(args[0])->Get(String::NewFromUtf8(isolate, "arg4"))->NumberValue() << std::endl;
  outfile.close();

  // open a file in write mode.
  std::ofstream outfile1;
  outfile1.open("wrapper-add_fisher-array_pos.csv");
  for (unsigned int i = 0; i < array_posx->Length(); i++) {
	  outfile1 << static_cast<int>(Handle<Array>::Cast(array_fisher_id->Get(i))->NumberValue()) << ",";
	  outfile1 << static_cast<int>(Handle<Array>::Cast(array_posx->Get(i))->NumberValue()) << ",";
	  outfile1 << static_cast<int>(Handle<Array>::Cast(array_posy->Get(i))->NumberValue()) << ",";
	  outfile1 << Handle<Array>::Cast(array_travelrange->Get(i))->NumberValue() << ",";
	  outfile1 << Handle<Array>::Cast(array_maxratio_perfisher->Get(i))->NumberValue() << ",";
	  outfile1 << Handle<Array>::Cast(array_threshold_perfisher->Get(i))->NumberValue();
	  outfile1 << std::endl;
  }
  outfile1.close();

  for (unsigned int i = 0 ; i < array_posx->Length(); i++) {

  // 4th arg is numeric

  //String::Utf8Value fisher_arg(args[0]->ToString());
  //std::string fisher_type (*fisher_arg);

  // can't use switch with integer types. Compiler complains when
  // not bundling the new_fisher properties setting inside the if 
  // block.
  fisher_id = static_cast<int>(Handle<Array>::Cast(array_fisher_id->Get(i))->NumberValue());
  home_x = static_cast<int>(Handle<Array>::Cast(array_posx->Get(i))->NumberValue());
  home_y = static_cast<int>(Handle<Array>::Cast(array_posy->Get(i))->NumberValue());
  biomass1_maxratio = Handle<Array>::Cast(array_maxratio_perfisher->Get(i))->NumberValue();
  threshold = Handle<Array>::Cast(array_threshold_perfisher->Get(i))->NumberValue();

  if (fisher_type == "uniform"){
    auto* new_fisher = new fishing::EqualFisher(fisher_id, threshold, home_x, home_y, biomass1_maxratio);
	new_fisher->protection_mask = obj->fishspace_model.protection_mask;
	new_fisher->baseline[0] = mult_frac_2df(obj->fishspace_model.carrying_capacity[0], minimum_fishable_ratio1);
	new_fisher->baseline[1] = mult_frac_2df(obj->fishspace_model.carrying_capacity[1], minimum_fishable_ratio2);
	obj->fishspace_model.fisher_set[0].push_back(new_fisher);
  }

  // For closest and random_walk, perform argc check.
  else if (fisher_type == "closest") {
/*    if ( args.Length() != 5 ) {
      isolate->ThrowException(Exception::TypeError(
        String::NewFromUtf8(isolate, "Incorrect number of arguments passed" + fisher_type)));
      return ;
    }*/
    auto* new_fisher = new fishing::ClosestFisher(fisher_id, threshold, home_x, home_y, biomass1_maxratio);
	//double range = Handle<Object>::Cast(args[0])->Get(String::NewFromUtf8(isolate, "arg4"))->NumberValue();
	//new_fisher->travel_range = range;
	new_fisher->travel_range = static_cast<double>(Handle<Array>::Cast(array_travelrange->Get(i))->NumberValue());
	new_fisher->protection_mask = obj->fishspace_model.protection_mask;
	new_fisher->baseline[0] = mult_frac_2df(obj->fishspace_model.carrying_capacity[0], minimum_fishable_ratio1);
	new_fisher->baseline[1] = mult_frac_2df(obj->fishspace_model.carrying_capacity[1], minimum_fishable_ratio2);
	obj->fishspace_model.fisher_set[0].push_back(new_fisher);
  }

  //same as closest fisher
  else if (fisher_type == "smart_fisher") {
      auto* new_fisher = new fishing::ClosestFisher(fisher_id, threshold, home_x, home_y, biomass1_maxratio);
	  //double range = Handle<Object>::Cast(args[0])->Get(String::NewFromUtf8(isolate, "arg4"))->NumberValue();
	  //new_fisher->travel_range = range;
	  new_fisher->travel_range = static_cast<double>(Handle<Array>::Cast(array_travelrange->Get(i))->NumberValue());
	  new_fisher->protection_mask = obj->fishspace_model.protection_mask;
	  new_fisher->baseline[0] = mult_frac_2df(obj->fishspace_model.carrying_capacity[0], minimum_fishable_ratio1);
	  new_fisher->baseline[1] = mult_frac_2df(obj->fishspace_model.carrying_capacity[1], minimum_fishable_ratio2);
	  obj->fishspace_model.fisher_set[0].push_back(new_fisher);
    }


  else if (fisher_type == "random_walk") {
/*    if ( args.Length() != 5 ) {
      isolate->ThrowException(Exception::TypeError(
        String::NewFromUtf8(isolate, "Incorrect number of arguments passed." + fisher_type)));
      return ;
    }*/
    auto* new_fisher = new fishing::RandomWalkFisher(fisher_id, threshold, home_x, home_y, biomass1_maxratio);
	//int thresh = static_cast<int>(Handle<Object>::Cast(args[0])->Get(String::NewFromUtf8(isolate, "arg4"))->NumberValue());
	//new_fisher->step_threshold = thresh;
	new_fisher->step_threshold = static_cast<int>(Handle<Array>::Cast(array_travelrange->Get(i))->NumberValue());
	new_fisher->protection_mask = obj->fishspace_model.protection_mask;
	new_fisher->baseline[0] = mult_frac_2df(obj->fishspace_model.carrying_capacity[0], minimum_fishable_ratio1);
	new_fisher->baseline[1] = mult_frac_2df(obj->fishspace_model.carrying_capacity[1], minimum_fishable_ratio2);
	obj->fishspace_model.fisher_set[0].push_back(new_fisher);
  }

  else {
    isolate->ThrowException(Exception::TypeError(
      String::NewFromUtf8(isolate, "Fisher type not recognized.")));
  }
  }
  outputObject->Set(
  		  String::NewFromUtf8(isolate, "quota"),
  		  Number::New(isolate, threshold));
/*  outputObject->Set(
  		  String::NewFromUtf8(isolate, "coordsetx"),
  		  Number::New(isolate, array_posx->Get(0)->NumberValue()));
  outputObject->Set(
  		  String::NewFromUtf8(isolate, "coordsety"),
  		  Number::New(isolate, array_posy->Get(0)->NumberValue()));*/

  args.GetReturnValue().Set(outputObject);
}

/*!
  \brief API function to run the model each timestep
  \details This is called by the function callRunTimestep() in maps.js (\\gui\\scripts\\)
  \param args A set of parameter objects passed by the Javascript function
  \return outputObject A set of output objects passed back to the Javascript
*/
void FISHSpace::run_timestep(const FunctionCallbackInfo<Value>& args){
  /* Triggered in node, which in turn triggers the wrapped model 
  class, to simulate the next timestep. Returns the current
  timestep index. */
  FISHSpace* obj = ObjectWrap::Unwrap<FISHSpace>(args.Holder());
  Isolate* isolate = args.GetIsolate();
  Local<Object> outputObject = Object::New(isolate);
  // TODO: perform checks in the wrapped object if all the data
  // required for running a timestep is present.
  //obj->fishspace_model.run_timestep();
  outputObject->Set(
  		  String::NewFromUtf8(isolate, "current_time"),
  		  Number::New(isolate, obj->fishspace_model.current_time));
/*  args.GetReturnValue().Set(
    Number::New(isolate,obj->fishspace_model.current_time)
  );*/

  ModelOutput sample_output = obj->fishspace_model.get_current_state();
  obj->fishspace_model.run_timestep();

  //For debugging purposes, write matrix output to CSV file
  obj->fishspace_model.saveToFile(sample_output.biomass_grid, "biomass_grid0.csv");
  obj->fishspace_model.saveToFile(sample_output.biomass_grid2, "biomass_grid1.csv");
  obj->fishspace_model.saveToFile(sample_output.fisher_catch, "fisher_catch0.csv");
  obj->fishspace_model.saveToFile(sample_output.fisher_catch2, "fisher_catch1.csv");
  obj->fishspace_model.saveToFile(sample_output.fisher_locs, "fisher_locs0.csv");
  obj->fishspace_model.saveToFile(sample_output.fisher_locs2, "fisher_locs1.csv");
  //end debug

//	double total_biomass;
//	std::vector<std::vector<double>> biomass_grid;
//	std::vector<std::vector<std::vector<int>>> fisher_locs;
//	std::vector<std::vector<int>> fisher_origin;
 
  outputObject->Set(
      String::NewFromUtf8(isolate, "total_biomass"),
      Number::New(isolate, sample_output.total_biomass));

  outputObject->Set(
	  String::NewFromUtf8(isolate, "total_biomass2"),
	  Number::New(isolate, sample_output.total_biomass2));

  outputObject->Set(
      String::NewFromUtf8(isolate, "biomass_inside"),
      Number::New(isolate, sample_output.biomass_inside));

  outputObject->Set(
	  String::NewFromUtf8(isolate, "biomass_inside2"),
	  Number::New(isolate, sample_output.biomass_inside2));

  Local<Array> biomassGridArray = Array::New(isolate);
  for(int i = 0;i < int(sample_output.biomass_grid.size()); i++){
  		Local<Array> anotherInstance = Array::New(isolate);
  		int innerArrayCount = sample_output.biomass_grid[i].size();
  		for(int j = 0;j < innerArrayCount; j++){
  			double innerArrayValue = sample_output.biomass_grid[i][j];
  			anotherInstance->Set(j, Number::New(isolate, innerArrayValue));
  		}
  		biomassGridArray->Set(i, anotherInstance);
  }

  outputObject->Set(
  		  String::NewFromUtf8(isolate, "biomass_grid"), biomassGridArray);

  Local<Array> biomassGridArray2 = Array::New(isolate);
  for (int i = 0; i < int(sample_output.biomass_grid2.size()); i++) {
	  Local<Array> anotherInstance = Array::New(isolate);
	  int innerArrayCount = sample_output.biomass_grid2[i].size();
	  for (int j = 0; j < innerArrayCount; j++) {
		  double innerArrayValue = sample_output.biomass_grid2[i][j];
		  anotherInstance->Set(j, Number::New(isolate, innerArrayValue));
	  }
	  biomassGridArray2->Set(i, anotherInstance);
  }

  outputObject->Set(
	  String::NewFromUtf8(isolate, "biomass_grid2"), biomassGridArray2);

  Local<Array> fisherLocsArray = Array::New(isolate);
  for (int i = 0; i < int(sample_output.fisher_locs2.size()); i++) {
	  Local<Array> anotherInstance = Array::New(isolate);
	  int innerArrayCount = sample_output.fisher_locs[i].size();
	  for (int j = 0; j < innerArrayCount; j++) {
		  Local<Array> yetAnotherInstance = Array::New(isolate);
		  int innermostArrayCount = sample_output.fisher_locs[i][j].size();
		  for (int k = 0; k < innermostArrayCount; k++) {
			  int innermostArrayValue = sample_output.fisher_locs[i][j][k];
			  yetAnotherInstance->Set(k, Number::New(isolate, innermostArrayValue));
		  }
		  anotherInstance->Set(j, yetAnotherInstance);
	  }
	  fisherLocsArray->Set(i, anotherInstance);
  }
  outputObject->Set(
	  String::NewFromUtf8(isolate, "fisher_locs"), fisherLocsArray);

  Local<Array> fisherLocsArray2 = Array::New(isolate);
  for (int i = 0; i < int(sample_output.fisher_locs2.size()); i++) {
	  Local<Array> anotherInstance = Array::New(isolate);
	  int innerArrayCount = sample_output.fisher_locs2[i].size();
	  for (int j = 0; j < innerArrayCount; j++) {
		  Local<Array> yetAnotherInstance = Array::New(isolate);
		  int innermostArrayCount = sample_output.fisher_locs2[i][j].size();
		  for (int k = 0; k < innermostArrayCount; k++) {
			  int innermostArrayValue = sample_output.fisher_locs2[i][j][k];
			  yetAnotherInstance->Set(k, Number::New(isolate, innermostArrayValue));
		  }
		  anotherInstance->Set(j, yetAnotherInstance);
	  }
	  fisherLocsArray2->Set(i, anotherInstance);
  }
  outputObject->Set(
	  String::NewFromUtf8(isolate, "fisher_locs2"), fisherLocsArray2);

  Local<Array> fisherCatchArray = Array::New(isolate);
  for(int i = 0;i < int(sample_output.fisher_catch.size()); i++){
   		double fisherCatchValue = sample_output.fisher_catch[i];
   		fisherCatchArray->Set(i, Number::New(isolate, fisherCatchValue));
   }
   outputObject->Set(
   		  String::NewFromUtf8(isolate, "fisher_catch"), fisherCatchArray);

   Local<Array> fisherCatchArray2 = Array::New(isolate);
   for (int i = 0; i < int(sample_output.fisher_catch2.size()); i++) {
	   double fisherCatchValue = sample_output.fisher_catch2[i];
	   fisherCatchArray->Set(i, Number::New(isolate, fisherCatchValue));
   }
   outputObject->Set(
	   String::NewFromUtf8(isolate, "fisher_catch2"), fisherCatchArray2);

    args.GetReturnValue().Set(outputObject);
}

/*!
  \brief API function that passes the parameters from the Javascript front-end GUI to the C++ program and initializes the model parameters in C++
  \details This is called by the function runModel() in maps.js (\\gui\\scripts\\)
  \param args A set of parameter objects passed by the Javascript function which in this case is the modelInput prepared by the function prepareModelParams(callback)
  in input-transforms.js. The javascript passes 12 parameters declared in global-objects.js and these are "initial_biomass","carrying_capacity","geog_mask","protection_mask","retention",
  "spillover_rate","growth_rate","connectivity_matrix","fecundity","recruitment_rate","spillover_threshold","metadata"
  \return An outputObject which contains "growth_rate","spillover_rate","geog_mask" and "metadata" passed back to the javascript
*/
void FISHSpace::shim(const v8::FunctionCallbackInfo<v8::Value>& args) {
	Isolate* isolate = args.GetIsolate();
  FISHSpace* obj = ObjectWrap::Unwrap<FISHSpace>(args.Holder());
	//Accept values from front-end as v8 data types then convert them to native C++ data types
	Local<Object> outputObject = Object::New(isolate);

	ModelInput modelInput = parse_model_input(isolate, Handle<Object>::Cast(args[0]));
	MapInputs mapInputs = parse_map_input(isolate, Handle<Object>::Cast(args[0]));
	modelInput.map_inputs = mapInputs;
    // Pass modelInput to method and initialize values
    obj->fishspace_model.initialize_parameters(modelInput);

	//I'm expecting the result of that method to look like the ModelOutput object
	//I'll just have to transfer my "shim-back" codes from run_timestep to here to convert the native C++
	//data types that your output will produce back to v8 which will then be passed back to the front-end

	//For now, this method just returns some samples of the object you initially passed to this method, just to demonstrate
	//that the shimming works.
	outputObject->Set(
			  String::NewFromUtf8(isolate, "growth_rate"),
			  Number::New(isolate, modelInput.growth_rate));
	outputObject->Set(
		String::NewFromUtf8(isolate, "growth_rate2"),
		Number::New(isolate, modelInput.growth_rate2));

	outputObject->Set(
				  String::NewFromUtf8(isolate, "spillover_rate"),
				  Number::New(isolate, modelInput.spillover_rate));
	outputObject->Set(
		String::NewFromUtf8(isolate, "spillover_rate2"),
		Number::New(isolate, modelInput.spillover_rate2));

	Local<Array> geogMaskArray = Array::New(isolate);
	  for(int i = 0;i < int(modelInput.map_inputs.geog_mask.size()); i++){
	  		Local<Array> anotherInstance = Array::New(isolate);
	  		int innerArrayCount = modelInput.map_inputs.geog_mask[i].size();
	  		for(int j = 0;j < innerArrayCount; j++){
	  			int innerArrayValue = modelInput.map_inputs.geog_mask[i][j];
	  			anotherInstance->Set(j, Number::New(isolate, innerArrayValue));
	  		}
	  		geogMaskArray->Set(i, anotherInstance);
	  }
	  outputObject->Set(
	  		  String::NewFromUtf8(isolate, "geog_mask"), geogMaskArray);

	  outputObject->Set(
	  				  String::NewFromUtf8(isolate, "metadata"),
	  				  Number::New(isolate, modelInput.connectivity.metadata[0].x_pos));

	args.GetReturnValue().Set(outputObject);
}

/*!
  \brief Function to multiply a matrix with a constant decimal number/fraction
  \param the_array A matrix or 2-dimensional array (vector)
  \param frac A decimal number representing a fraction
*/
vector2d<double> FISHSpace::mult_frac_2df(vector2d<double> the_array, double frac) {
  int dim_x = the_array.size();
  int dim_y = the_array[0].size();
  vector2d<double> new_matrix (dim_x, vector<double>(dim_y, 0));

  for (int i = 0; i < dim_x; i++) {
    for (int j = 0; j < dim_y; j++) {
      new_matrix[i][j] = the_array[i][j] * frac;
    }
  }
  return new_matrix;
}

/*** FROM OLD parameters.cpp FILE, MIGRATED 03 Jul 2018 ***/
/*
//Chester, if you can read this, I'm not well-versed in C++ and I don't know how to eliminate recursive calling (I always encounter this error)
//I know the class I did below this note is redundant as it already is defined in another header but I can't get it to work from there, so
//until I find a way how to invoke that class without creating an error, I'll use this class temporarily. -- ps_katchatore

//Method to convert v8 data to native C++
ModelParameters parse_model_params(Isolate * isolate, const Handle<Object> model_params) {

	ModelParameters inputs;
	int outerArraycount;

	Handle<Value> spillover = model_params->Get(String::NewFromUtf8(isolate, "spillover_rate"));
	Handle<Value> growth = model_params->Get(String::NewFromUtf8(isolate, "growth_rate"));
	Handle<Value> warmup = model_params->Get(String::NewFromUtf8(isolate, "warmup_time"));
	Handle<Value> conncydl = model_params->Get(String::NewFromUtf8(isolate, "connectivity_delay"));
	Handle<Value> currenttime = model_params->Get(String::NewFromUtf8(isolate, "current_time"));
	Handle<Array> initialBiomassArray = Handle<Array>::Cast(model_params->Get(String::NewFromUtf8(isolate, "initial_biomass")));
	Handle<Array> carryingCapacityArray = Handle<Array>::Cast(model_params->Get(String::NewFromUtf8(isolate, "carrying_capacity")));
	Handle<Array> geogMaskArray = Handle<Array>::Cast(model_params->Get(String::NewFromUtf8(isolate, "geog_mask")));
	Handle<Array> depthMaskArray = Handle<Array>::Cast(model_params->Get(String::NewFromUtf8(isolate, "depth_mask")));
	Handle<Array> protectionMaskArray = Handle<Array>::Cast(model_params->Get(String::NewFromUtf8(isolate, "protection_mask")));
	Handle<Array> reefConnectivityMatrixArray = Handle<Array>::Cast(model_params->Get(String::NewFromUtf8(isolate, "reef_connectivity_matrix")));

	inputs.spillover_rate = spillover->NumberValue();
	inputs.growth_rate = growth->NumberValue();
	inputs.warmup_time = warmup->NumberValue();
	inputs.connectivity_delay = conncydl->NumberValue();
	inputs.current_time = currenttime->NumberValue();

	//TODO: Optimize this code block
	//The following code converts v8 array of arrays to native c++ vector of vectors
	//initial_biomass to native C++
	outerArraycount = initialBiomassArray->Length();
	for (int i = 0; i < outerArraycount; i++) {
		Handle <Array> innerinitialBiomassArray = Handle<Array>::Cast(Handle<Array>::Cast(initialBiomassArray->Get(i)));
		int innerArrayCount = innerinitialBiomassArray->Length();
		std::vector<double> store;
		for (int i = 0; i < innerArrayCount; i++) {
			double innerArrayInstance = Handle < Array
					> ::Cast(innerinitialBiomassArray->Get(i))->NumberValue();
			store.push_back(innerArrayInstance);
		}
		inputs.initial_biomass.push_back(store);
	}

	//carrying_capacity to native C++
	outerArraycount = carryingCapacityArray->Length();
	for (int i = 0; i < outerArraycount; i++) {
		Handle <Array> innercarryingCapacityArray = Handle<Array>::Cast(Handle<Array>::Cast(carryingCapacityArray->Get(i)));
		int innerArrayCount = innercarryingCapacityArray->Length();
		std::vector<double> store;
		for (int i = 0; i < innerArrayCount; i++) {
			double innerArrayInstance = Handle < Array
					> ::Cast(innercarryingCapacityArray->Get(i))->NumberValue();
			store.push_back(innerArrayInstance);
		}
		inputs.carrying_capacity.push_back(store);
	}

	//geog_mask to native C++
	outerArraycount = geogMaskArray->Length();
	for (int i = 0; i < outerArraycount; i++) {
		Handle<Array> innergeogMaskArray = Handle<Array>::Cast(Handle<Array>::Cast(geogMaskArray->Get(i)));
		int innerArrayCount = innergeogMaskArray->Length();
		std::vector<bool> store;
		for (int i = 0; i < innerArrayCount; i++) {
			bool innerArrayInstance = Handle<Array>::Cast(innergeogMaskArray->Get(i))->BooleanValue();
			store.push_back(innerArrayInstance);
		}
		inputs.geog_mask.push_back(store);
	}

	outerArraycount = depthMaskArray->Length();
	for (int i = 0; i < outerArraycount; i++) {
		Handle<Array> innerdepthMaskArray = Handle<Array>::Cast(Handle<Array>::Cast(depthMaskArray->Get(i)));
		int innerArrayCount = innerdepthMaskArray->Length();
		std::vector<double> store;
		for (int i = 0; i < innerArrayCount; i++) {
			double innerArrayInstance = Handle<Array>::Cast(innerdepthMaskArray->Get(i))->NumberValue();
			store.push_back(innerArrayInstance);
		}
		inputs.depth_mask.push_back(store);
	}

	//protection_mask to native C++
	outerArraycount = protectionMaskArray->Length();
	for (int i = 0; i < outerArraycount; i++) {
		Handle<Array> innerprotectionMaskArray = Handle<Array>::Cast(Handle<Array>::Cast(protectionMaskArray->Get(i)));
		int innerArrayCount = innerprotectionMaskArray->Length();
		std::vector<bool> store;
		for (int i = 0; i < innerArrayCount; i++) {
			bool innerArrayInstance = Handle<Array>::Cast(innerprotectionMaskArray->Get(i))->BooleanValue();
			store.push_back(innerArrayInstance);
		}
		inputs.protection_mask.push_back(store);
	}

	//reef_connectivity_matrix to native C++
	outerArraycount = reefConnectivityMatrixArray->Length();
	for (int i = 0; i < outerArraycount; i++) {
		Handle<Array> innerreefConnectivityMatrixArray = Handle<Array>::Cast(Handle<Array>::Cast(reefConnectivityMatrixArray->Get(i)));
		int innerArrayCount = innerreefConnectivityMatrixArray->Length();
		std::vector<double> store;
		for (int i = 0; i < innerArrayCount; i++) {
			double innerArrayInstance = Handle<Array>::Cast(innerreefConnectivityMatrixArray->Get(i))->NumberValue();
			store.push_back(innerArrayInstance);
		}
		inputs.reef_connectivity_matrix.push_back(store);
	}

	return inputs;
}
*/
/*** END: (UNUSED) FROM OLD parameters.cpp FILE, MIGRATED 03 Jul 2018 ***/

/*!
  \brief This function parses and maps the parameters to the ModelInput object. Used to convert v8 data to native C++
  \details This function/method was lifted from the parameters.cpp code
  \param isolate Parameter of type Isolate from the Electron NodeJS GUI
  \param model_params A handle object for the parameters of the model. These parameters are "growth_rate","spillover_rate","spillover_threshold","fecundity","recruitment_rate","connectivity_matrix" and "metadata".
  The "metadata" is an array/vector/matrix with three columns (x_pos, y_pos and index).
  \return ModelInput
 */
ModelInput parse_model_input(Isolate * isolate, const Handle<Object> model_params) {

	ModelInput inputParameters;
	Connectivity connectivity;
	ConnectivityMetadata connectivityMetadata;

	Handle<Value> growth_rate = model_params->Get(String::NewFromUtf8(isolate, "growth_rate"));
	Handle<Value> spillover_rate = model_params->Get(String::NewFromUtf8(isolate, "spillover_rate"));
	Handle<Value> spillover_tres = model_params->Get(String::NewFromUtf8(isolate, "spillover_threshold"));
	Handle<Value> fecundity = model_params->Get(String::NewFromUtf8(isolate, "fecundity"));
	Handle<Value> recruitment_rate = model_params->Get(String::NewFromUtf8(isolate, "recruitment_rate"));
	Handle<Array> reefConnectivityMatrixArray = Handle<Array>::Cast(model_params->Get(String::NewFromUtf8(isolate, "connectivity_matrix")));

	Handle<Array> metadataObj = Handle<Array>::Cast(model_params->Get(String::NewFromUtf8(isolate, "metadata")));;

	inputParameters.spillover_rate = spillover_rate->NumberValue();
	inputParameters.growth_rate = growth_rate->NumberValue();
	inputParameters.spillover_threshold = spillover_tres->NumberValue();
	inputParameters.connectivity.fecundity = fecundity->NumberValue();
	inputParameters.connectivity.recruitment_rate = recruitment_rate->NumberValue();

	int outerArraycount = reefConnectivityMatrixArray->Length();
		for (int i = 0; i < outerArraycount; i++) {
			Handle<Array> innerreefConnectivityMatrixArray = Handle<Array>::Cast(Handle<Array>::Cast(reefConnectivityMatrixArray->Get(i)));
			int innerArrayCount = innerreefConnectivityMatrixArray->Length();
			std::vector<double> store;
			for (int j = 0; j < innerArrayCount; j++) {
				double innerArrayInstance = Handle<Array>::Cast(innerreefConnectivityMatrixArray->Get(j))->NumberValue();
				store.push_back(innerArrayInstance);
			}
			inputParameters.connectivity.connectivity_matrix.push_back(store);
		}

	int metadataSize = metadataObj->Length();
		for (int i = 0; i < metadataSize; i++){
			//Local<Object> metadataInstance = metadataObj[i]->ToObject();
			Handle<Object> metadataInstance = Handle<Array>::Cast(metadataObj->Get(i))->ToObject();
			Handle<Value> x_posVal = metadataInstance->Get(String::NewFromUtf8(isolate, "x_pos"));
			Handle<Value> y_posVal = metadataInstance->Get(String::NewFromUtf8(isolate, "y_pos"));
			Handle<Value> indexVal = metadataInstance->Get(String::NewFromUtf8(isolate, "index"));

			connectivityMetadata.x_pos = static_cast<int>(x_posVal->NumberValue());
			connectivityMetadata.y_pos = static_cast<int>(y_posVal->NumberValue());
			connectivityMetadata.index = static_cast<int>(indexVal->NumberValue());

			inputParameters.connectivity.metadata.push_back(connectivityMetadata);
		}

	//for second biomass (Pelagic Fish) parameters
	Handle<Value> growth_rate2 = model_params->Get(String::NewFromUtf8(isolate, "growth_rate2"));
	Handle<Value> spillover_rate2 = model_params->Get(String::NewFromUtf8(isolate, "spillover_rate2"));
	Handle<Value> spillover_tres2 = model_params->Get(String::NewFromUtf8(isolate, "spillover_threshold2"));
	Handle<Value> fecundity2 = model_params->Get(String::NewFromUtf8(isolate, "fecundity2"));
	Handle<Value> recruitment_rate2 = model_params->Get(String::NewFromUtf8(isolate, "recruitment_rate2"));
	Handle<Array> reefConnectivityMatrixArray2 = Handle<Array>::Cast(model_params->Get(String::NewFromUtf8(isolate, "connectivity_matrix2")));

	Handle<Array> metadataObj2 = Handle<Array>::Cast(model_params->Get(String::NewFromUtf8(isolate, "metadata2")));;

	inputParameters.spillover_rate2 = spillover_rate2->NumberValue();
	inputParameters.growth_rate2 = growth_rate2->NumberValue();
	inputParameters.spillover_threshold2 = spillover_tres2->NumberValue();
	inputParameters.connectivity.fecundity2 = fecundity2->NumberValue();
	inputParameters.connectivity.recruitment_rate2 = recruitment_rate2->NumberValue();

	int outerArraycount2 = reefConnectivityMatrixArray2->Length();
	for (int i = 0; i < outerArraycount2; i++) {
		Handle<Array> innerreefConnectivityMatrixArray2 = Handle<Array>::Cast(Handle<Array>::Cast(reefConnectivityMatrixArray2->Get(i)));
		int innerArrayCount2 = innerreefConnectivityMatrixArray2->Length();
		std::vector<double> store;
		for (int j = 0; j < innerArrayCount2; j++) {
			double innerArrayInstance2 = Handle<Array>::Cast(innerreefConnectivityMatrixArray2->Get(j))->NumberValue();
			store.push_back(innerArrayInstance2);
		}
		inputParameters.connectivity.connectivity_matrix2.push_back(store);
	}

	int metadataSize2 = metadataObj2->Length();
	for (int i = 0; i < metadataSize2; i++) {
		Handle<Object> metadataInstance2 = Handle<Array>::Cast(metadataObj2->Get(i))->ToObject();
		Handle<Value> x_posVal = metadataInstance2->Get(String::NewFromUtf8(isolate, "x_pos"));
		Handle<Value> y_posVal = metadataInstance2->Get(String::NewFromUtf8(isolate, "y_pos"));
		Handle<Value> indexVal = metadataInstance2->Get(String::NewFromUtf8(isolate, "index"));

		connectivityMetadata.x_pos = static_cast<int>(x_posVal->NumberValue());
		connectivityMetadata.y_pos = static_cast<int>(y_posVal->NumberValue());
		connectivityMetadata.index = static_cast<int>(indexVal->NumberValue());

		inputParameters.connectivity.metadata2.push_back(connectivityMetadata);
	}
	//end second fish biomass parameters

	return inputParameters;
}

/*!
  \brief This function parses and maps the matrix parameters to the MapInputs object. Used to convert v8 data to native C++
  \details This function/method was lifted from the parameters.cpp code
  \param isolate A V8::Isolate object for the NodeJS
  \param model_params A handle object for the NodeJS. The parameters are all arrays/vectors/matrix namely "initial_biomass","carrying_capacity","geog_mask","protection_mask" and "retention"
  \return MapInputs
*/
MapInputs parse_map_input(Isolate * isolate, const Handle<Object> model_params) {

	MapInputs inputMapParameters;
	int outerArraycount;

	Handle<Array> initialBiomassArray = Handle<Array>::Cast(model_params->Get(String::NewFromUtf8(isolate, "initial_biomass")));
	Handle<Array> carryingCapacityArray = Handle<Array>::Cast(model_params->Get(String::NewFromUtf8(isolate, "carrying_capacity")));
	Handle<Array> geogMaskArray = Handle<Array>::Cast(model_params->Get(String::NewFromUtf8(isolate, "geog_mask")));
	Handle<Array> protectionMaskArray = Handle<Array>::Cast(model_params->Get(String::NewFromUtf8(isolate, "protection_mask")));
	Handle<Array> retentionArray = Handle<Array>::Cast(model_params->Get(String::NewFromUtf8(isolate, "retention")));

	//initial_biomass to native C++
	outerArraycount = initialBiomassArray->Length();
	for (int i = 0; i < outerArraycount; i++) {
		Handle <Array> innerinitialBiomassArray = Handle<Array>::Cast(Handle<Array>::Cast(initialBiomassArray->Get(i)));
		int innerArrayCount = innerinitialBiomassArray->Length();
		std::vector<double> store;
			for (int i = 0; i < innerArrayCount; i++) {
				double innerArrayInstance = Handle < Array
						> ::Cast(innerinitialBiomassArray->Get(i))->NumberValue();
				store.push_back(innerArrayInstance);
			}
			inputMapParameters.initial_biomass.push_back(store);
		}

	//carrying_capacity to native C++
	outerArraycount = carryingCapacityArray->Length();
		for (int i = 0; i < outerArraycount; i++) {
			Handle <Array> innercarryingCapacityArray = Handle<Array>::Cast(Handle<Array>::Cast(carryingCapacityArray->Get(i)));
			int innerArrayCount = innercarryingCapacityArray->Length();
			std::vector<double> store;
			for (int i = 0; i < innerArrayCount; i++) {
				double innerArrayInstance = Handle < Array
						> ::Cast(innercarryingCapacityArray->Get(i))->NumberValue();
				store.push_back(innerArrayInstance);
			}
			inputMapParameters.carrying_capacity.push_back(store);
		}

	//geog_mask to native C++
	outerArraycount = geogMaskArray->Length();
		for (int i = 0; i < outerArraycount; i++) {
			Handle<Array> innergeogMaskArray = Handle<Array>::Cast(Handle<Array>::Cast(geogMaskArray->Get(i)));
			int innerArrayCount = innergeogMaskArray->Length();
			std::vector<int> store;
			for (int i = 0; i < innerArrayCount; i++) {
				int innerArrayInstance = static_cast<int>(Handle<Array>::Cast(innergeogMaskArray->Get(i))->NumberValue());
				store.push_back(innerArrayInstance);
			}
			inputMapParameters.geog_mask.push_back(store);
		}

	outerArraycount = protectionMaskArray->Length();
		for (int i = 0; i < outerArraycount; i++) {
			Handle<Array> innerprotectionMaskArray = Handle<Array>::Cast(Handle<Array>::Cast(protectionMaskArray->Get(i)));
			int innerArrayCount = innerprotectionMaskArray->Length();
			std::vector<int> store;
			for (int i = 0; i < innerArrayCount; i++) {
				int innerArrayInstance = Handle<Array>::Cast(innerprotectionMaskArray->Get(i))->BooleanValue();
				store.push_back(innerArrayInstance);
			}
			inputMapParameters.protection_mask.push_back(store);
		}

	//retention_mask to native C++
	outerArraycount = retentionArray->Length();
		for (int i = 0; i < outerArraycount; i++) {
			Handle<Array> innerRetentionArray = Handle<Array>::Cast(Handle<Array>::Cast(retentionArray->Get(i)));
			int innerArrayCount = innerRetentionArray->Length();
			std::vector<double> store;
			for (int j = 0; j < innerArrayCount; j++) {
				double innerArrayInstance = Handle<Array>::Cast(innerRetentionArray->Get(j))->NumberValue();
				store.push_back(innerArrayInstance);
				// if (innerArrayInstance > 0) std::cout << "(" << i << "," << j << "," << innerArrayInstance << "),";
			}
			inputMapParameters.retention.push_back(store);
		}

	//for second biomass (Pelagic Fish) parameters
	Handle<Array> initialBiomassArray2 = Handle<Array>::Cast(model_params->Get(String::NewFromUtf8(isolate, "initial_biomass2")));
	Handle<Array> carryingCapacityArray2 = Handle<Array>::Cast(model_params->Get(String::NewFromUtf8(isolate, "carrying_capacity2")));
	Handle<Array> retentionArray2 = Handle<Array>::Cast(model_params->Get(String::NewFromUtf8(isolate, "retention2")));

	//initial_biomass2 to native C++
	outerArraycount = initialBiomassArray2->Length();
	for (int i = 0; i < outerArraycount; i++) {
		Handle <Array> innerinitialBiomassArray = Handle<Array>::Cast(Handle<Array>::Cast(initialBiomassArray2->Get(i)));
		int innerArrayCount = innerinitialBiomassArray->Length();
		std::vector<double> store;
		for (int i = 0; i < innerArrayCount; i++) {
			double innerArrayInstance = Handle < Array
			> ::Cast(innerinitialBiomassArray->Get(i))->NumberValue();
			store.push_back(innerArrayInstance);
		}
		inputMapParameters.initial_biomass2.push_back(store);
	}

	//carrying_capacity2 to native C++
	outerArraycount = carryingCapacityArray2->Length();
	for (int i = 0; i < outerArraycount; i++) {
		Handle <Array> innercarryingCapacityArray = Handle<Array>::Cast(Handle<Array>::Cast(carryingCapacityArray2->Get(i)));
		int innerArrayCount = innercarryingCapacityArray->Length();
		std::vector<double> store;
		for (int i = 0; i < innerArrayCount; i++) {
			double innerArrayInstance = Handle < Array
			> ::Cast(innercarryingCapacityArray->Get(i))->NumberValue();
			store.push_back(innerArrayInstance);
		}
		inputMapParameters.carrying_capacity2.push_back(store);
	}

	//retention_mask to native C++
	outerArraycount = retentionArray2->Length();
	for (int i = 0; i < outerArraycount; i++) {
		Handle<Array> innerRetentionArray = Handle<Array>::Cast(Handle<Array>::Cast(retentionArray2->Get(i)));
		int innerArrayCount = innerRetentionArray->Length();
		std::vector<double> store;
		for (int j = 0; j < innerArrayCount; j++) {
			double innerArrayInstance = Handle<Array>::Cast(innerRetentionArray->Get(j))->NumberValue();
			store.push_back(innerArrayInstance);
			// if (innerArrayInstance > 0) std::cout << "(" << i << "," << j << "," << innerArrayInstance << "),";
		}
		inputMapParameters.retention2.push_back(store);
	}
	//end second fish biomass parameters

	return inputMapParameters;
}


}  // namespace fishspace
