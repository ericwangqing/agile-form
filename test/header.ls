'''
测试文件的头部。本文件代码在项目编译前，被添加到所有测试代码（test**.ls）的最前面。这样，避免了在多个测试文件中写一样的头部。
'''
require! {should, async, _: underscore, '../bin/utils', '../bin/Agile-form'}

debug = require('debug')('af')

# h = require './test-helpers' 

# describe "----------------------------------" * 2 , (...)->
#   before-each !(done)->
#     # console.log "******** before each **********"
#     h.extend-should!
#     h.create-engine done

#   after-each !(done)->
#     # console.log "******** after each **********"
#     h.clean-db done                      

