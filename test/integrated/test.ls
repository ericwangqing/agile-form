
describe '基本测试', (...)->
  it '编译json到form\n', (done)!->
    af = new Agile-form!
    homework = 
      _id: 'hid-1'
      # aid: 'aid-1'
      # student: '沈少伟'
      # content: '这个家伙很懒，还没留下什么....'
      # # score: null
      # created-at-time: 'xxx'
      # last-modified-at: 'xxx'
      # state: 'writing'
      comments:
        name: 'xxx'
        content: 
          name: 'xxx'
          content: 'xxx'

    (form)<-! af.generate-form homework
    debug form
    done!
    # result = ''
    # utils.async-object-visit config =
    #   obj: {a: 1, b: {c: 2}}
    #   visit-value: v = (key, value, callback)!->
    #     result := result + "\nkey: #{key}, value: #{value}"
    #     callback!
    #   visit-obj: 
    #     before: v
    #     after: (key, value, callback)!-> callback!
    #   done: !->
    #     debug "result: ", result  
    #     done!