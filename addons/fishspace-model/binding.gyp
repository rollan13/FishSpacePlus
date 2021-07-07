{
  "targets": [
    {"target_name": "model", 
        "sources": [
            "lib/wrapper.cpp",
            "lib/fishspace.cpp",
            "lib/model.cpp",
            "lib/fishing_agent.cpp",
            "lib/generator.cpp"
        ],
     "cflags": [ "-std=c++11", "-Ofast"],
     "include_dirs": ["<!(node -e \"require('nan')\")"]}
  ]
}