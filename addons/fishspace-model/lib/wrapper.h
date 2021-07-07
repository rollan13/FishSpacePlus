#pragma once

#include <nan.h>
#include <node.h>
#include <node_object_wrap.h>
#include <vector>

#include "parameters.h"
#include "model.h"

namespace fishspace {

class FISHSpace : public Nan::ObjectWrap {
 public:
  static void Init(v8::Local<v8::Object> exports);

 private:
  FISHSpace();
  ~FISHSpace();
  FISHSpaceModel fishspace_model;

  static void New(const v8::FunctionCallbackInfo<v8::Value>& args);
  static v8::Persistent<v8::Function> constructor;

  static void run_timestep(const v8::FunctionCallbackInfo<v8::Value>& args);
  static void add_fisher(const v8::FunctionCallbackInfo<v8::Value>& args);
  static void shim(const v8::FunctionCallbackInfo<v8::Value>& args);

  static vector2d<double> mult_frac_2df(vector2d<double> the_array, double frac);
  // TODO: implement!
  // vector<vector<double>> convert_2Dfloat(/**/);
  // static void is_valid (const v8::FunctionCallbackInfo<v8::Value>& args);
  // static void pass_data (const v8::FunctionCallbackInfo<v8::Value>& args);
};

/*** FROM OLD parameters.cpp FILE, MIGRATED 03 Jul 2018 ***/
//ModelParameters parse_model_params(v8::Isolate *, const v8::Handle<v8::Object> model_params);
/*** END: (UNUSED) FROM OLD parameters.cpp FILE, MIGRATED 03 Jul 2018 ***/
ModelInput parse_model_input(v8::Isolate *, const v8::Handle<v8::Object> model_params);
MapInputs parse_map_input(v8::Isolate *, const v8::Handle<v8::Object> model_params);

}  // namespace fishspace