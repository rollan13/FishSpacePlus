#include <node.h>
#include "wrapper.h"

/** \file fishspace.cpp
 * \brief This contains the InitAll method for the NodeJS module
 */
namespace fishspace {

using v8::Local;
using v8::Object;

void InitAll(Local<Object> exports) {
  FISHSpace::Init(exports);
}

NODE_MODULE(NODE_GYP_MODULE_NAME, InitAll)

}  // namespace fishspace