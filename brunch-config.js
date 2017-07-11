module.exports = {
   paths:   {
      public:  './public',
      watched: ['./app']
   },
   modules: {
      autoRequire: {
         'js/app.js': ['initialize']
      }
   },
   plugins: {
      on:     ['clean-css-brunch'],
      stylus: {plugins: ['autoprefixer-stylus']},
	  uglify: {
		  mangle: false,
		  compress: {
			  global_defs: {
				  DEBUG: false
			  }
		  }
	  }
   },
   npm:     {
      globals: {},
   },
   files:   {
      javascripts: {
         joinTo: 'js/app.js'
      },
      stylesheets: {
         joinTo: {
            'css/app.css': /^app\/stylus\/app.styl$/
         }
      }
   }
}