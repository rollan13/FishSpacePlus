from libcpp.vector cimport vector

cdef extern from "../libfishspace/fishing_agent.cpp" namespace 'Fishing':
    cpdef cppclass Fisher:
        Fisher() except +
        Fisher(double) except +

        vector[vector[double]] fish_out(int, int, vector[vector[double]], vector[vector[double]], vector[vector[double]], vector[vector[double]])
        vector[int] get_position()
        vector[vector[double]] fishing_record
        vector[vector[double]] get_state_history()
