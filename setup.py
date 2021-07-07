from setuptools import setup, Extension

from Cython.Build import cythonize

from platform import system, os
import pathlib
import sys
from glob import glob

cpp_stdlib = "libc++"

# Specify compile and link args
extra_compile_args = [
    "-std=c++11", ## Compile C++11 code
    ## Add include directories
    "-I/usr/local/include",
    "-I/usr/include",
    f"-I{sys.path[0]}/addons/fishspace-model/lib",
    f"-I{pathlib.Path.home()}/.node-gyp/10.5.0/include/node",
    "-D_GLIBCXX_USE_CXX11_ABI=0"
]
extra_link_args = [
    "-std=c++11", ## Link C++11 code
    "-D_GLIBCXX_USE_CXX11_ABI=0"
]

# Add platform-specific changes to args and environment
# variables.

if system() == "Darwin":
    # Set minimum target to 10.7 (supports C++11/libc++)
    os.environ["MACOSX_DEPLOYMENT_TARGET"] = "10.9"
    extra_compile_args += [ "-stdlib={0}".format(cpp_stdlib) ]


setup(
    name='fishspace',
    packages=['pyfishspace'],
    # package_data={'fishspace': ['data/*']},
    ext_modules=cythonize(Extension(

    "pyfishspace.model", # extension name

    sources=[
        *glob("pyfishspace/model.pyx"), # Add all .pyx files for compilation
        ## external source files
        'addons/fishspace-model/lib/fishing_agent.cpp',
        'addons/fishspace-model/lib/generator.cpp',
        'addons/fishspace-model/lib/model.cpp'
    ],

    language="c++", #language
    extra_compile_args=extra_compile_args,
    extra_link_args=extra_link_args
)))
