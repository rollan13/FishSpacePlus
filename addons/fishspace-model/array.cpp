#include <nan.h>
#include <node.h>

using namespace v8;

void generateArray(const Nan::FunctionCallbackInfo<v8::Value>& args) {

	Isolate* isolate = args.GetIsolate();

	Local<Array> sampleArray = Array::New(isolate);
	//sorry for the crude implementation, you could loop this but I was too lazy to think of an algo (this is just a sample anyways hehehehe :D)
	Local<Array> ar0 = Array::New(isolate); ar0->Set( 0 , Number::New(isolate, 1 )); ar0->Set( 1 , Number::New(isolate, 2 ));
	Local<Array> ar1 = Array::New(isolate); ar1->Set( 0 , Number::New(isolate, 3 )); ar1->Set( 1 , Number::New(isolate, 4 ));
	Local<Array> ar2 = Array::New(isolate); ar2->Set( 0 , Number::New(isolate, 5 )); ar2->Set( 1 , Number::New(isolate, 6 ));
	Local<Array> ar3 = Array::New(isolate); ar3->Set( 0 , Number::New(isolate, 7 )); ar3->Set( 1 , Number::New(isolate, 8 ));
	Local<Array> ar4 = Array::New(isolate); ar4->Set( 0 , Number::New(isolate, 9 )); ar4->Set( 1 , Number::New(isolate, 10 ));
	Local<Array> ar5 = Array::New(isolate); ar5->Set( 0 , Number::New(isolate, 11 )); ar5->Set( 1 , Number::New(isolate, 12 ));
	Local<Array> ar6 = Array::New(isolate); ar6->Set( 0 , Number::New(isolate, 13 )); ar6->Set( 1 , Number::New(isolate, 14 ));
	Local<Array> ar7 = Array::New(isolate); ar7->Set( 0 , Number::New(isolate, 15 )); ar7->Set( 1 , Number::New(isolate, 16 ));
	Local<Array> ar8 = Array::New(isolate); ar8->Set( 0 , Number::New(isolate, 17 )); ar8->Set( 1 , Number::New(isolate, 18 ));
	Local<Array> ar9 = Array::New(isolate); ar9->Set( 0 , Number::New(isolate, 19 )); ar9->Set( 1 , Number::New(isolate, 20 ));

	sampleArray->Set( 0 , ar0);
	sampleArray->Set( 1 , ar1);
	sampleArray->Set( 2 , ar2);
	sampleArray->Set( 3 , ar3);
	sampleArray->Set( 4 , ar4);
	sampleArray->Set( 5 , ar5);
	sampleArray->Set( 6 , ar6);
	sampleArray->Set( 7 , ar7);
	sampleArray->Set( 8 , ar8);
	sampleArray->Set( 9 , ar9);
	args.GetReturnValue().Set(sampleArray);
}

void init(v8::Local<v8::Object> exports) {
  exports->Set(Nan::New("array").ToLocalChecked(),
               Nan::New<v8::FunctionTemplate>(generateArray)->GetFunction());
}

NODE_MODULE(array, init)
