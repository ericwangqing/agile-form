require! ['jade', './utils']

# FIXTURE_PATH = __dirname 

module.exports = class Agile-form
  (@jade-templates-dir = __dirname)->

  generate-form: (obj, done)!~>
    @form = ''
    utils.async-object-visit config = 
      obj: obj
      visit-value: @create-field
      visit-obj:  before: @open-fieldset, after: @close-fieldset
      done: !~> done @form

  open-fieldset: (key, value, callback)!~>
    @form += if (is-top-level = !key) then '<form>\n' else '<fieldset>\n'
    callback!

  close-fieldset: (key, value, callback)!~>
    @form += if (is-top-level = !key) then '</form>\n' else '</fieldset>\n'
    callback!


  create-field: (key, value, callback)!~>
    switch typeof value
      when 'number' then @create-number-field key, value, callback
      else @create-default-field key, value, callback

  create-number-field: (key, value, done)!~>
    @form += '<input type=number>\n'
    done!

  create-default-field: (key, value, done)!~>
    # @form += '<input type=text>\n'
    # done!
    # jade.render-file 'default-field.jade', done

    jade.render-file @jade-templates-dir + "/default-field.jade", {key: key}, (err, result)!~>
      throw err if err
      @form += result
      done!



