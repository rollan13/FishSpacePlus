#include "fishing_agent.h"
#include "parameters.h"

#include <vector>
#include <node.h>

/** \file parameters.cpp
 * \brief This contains the methods to parse the parameters but it is no longer used because the methods were recreated in wrapper.cpp
 */
namespace fishspace {

using v8::Isolate;
using v8::String;
using v8::Value;
using v8::Array;
using v8::Isolate;
using v8::Handle;
using v8::Object;

//Chester, if you can read this, I'm not well-versed in C++ and I don't know how to eliminate recursive calling (I always encounter this error)
//I know the class I did below this note is redundant as it already is defined in another header but I can't get it to work from there, so
//until I find a way how to invoke that class without creating an error, I'll use this class temporarily. -- ps_katchatore

//Method to convert v8 data to native C++
/* This is not used anymore anywhere in the project. */
/*
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
		std::vector<int> store;
		for (int i = 0; i < innerArrayCount; i++) {
			int innerArrayInstance = Handle<Array>::Cast(innerreefConnectivityMatrixArray->Get(i))->BooleanValue();
			store.push_back(innerArrayInstance);
		}
		inputs.reef_connectivity_matrix.push_back(store);
	}

	return inputs;
}
*/

/*
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
			for (int i = 0; i < innerArrayCount; i++) {
				double innerArrayInstance = Handle<Array>::Cast(innerreefConnectivityMatrixArray->Get(i))->BooleanValue();
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

			connectivityMetadata.x_pos = x_posVal->NumberValue();
			connectivityMetadata.y_pos = y_posVal->NumberValue();
			connectivityMetadata.index = indexVal->NumberValue();

			inputParameters.connectivity.metadata.push_back(connectivityMetadata);
		}

	return inputParameters;
}
*/

/*
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
				int innerArrayInstance = Handle<Array>::Cast(innergeogMaskArray->Get(i))->NumberValue();
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
			for (int i = 0; i < innerArrayCount; i++) {
				double innerArrayInstance = Handle<Array>::Cast(innerRetentionArray->Get(i))->NumberValue();
				store.push_back(innerArrayInstance);
			}
			inputMapParameters.retention.push_back(store);
		}

	return inputMapParameters;
}
*/


}



