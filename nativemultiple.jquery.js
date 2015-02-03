(function( $ ){
	/**
	 * default values
	 */
	var _defaults = {
		stylesheet: "",
		tooltip: false,
		onCreate: {},
		onChange: {},
		vertical: false
	};
	
	/**
	 * events
	 */
	var touchstart = 'touchstart mousedown';
	var touchmove = 'touchmove mousemove';
	var touchend = 'touchend mouseup';
	
	var touch_down = true;
	var inter_value = 0;

	/**
	 * methods
	 */
    var methods = {
		/**
		 * each all selectors
		 */
        init : function(options) {
			options = $.extend(true, {}, _defaults, options);
			
			// create wrapper
			$(this).each(function() {
				var $this = $(this);
				var values = $this.attr("value");
				
				var last_first = 0;
				var last_second = 0;
				
				if(values != undefined) {
					values = values.split(',');
				}
				else {
					values = ['0',$this.attr('max')];
				}
				
				if(values[1] == undefined) {
					values[1] = values[0];
				}
				
				last_first = values[0];
				last_second = values[1];
				
				var $wrapper = $("<div></div>").addClass(options.stylesheet).addClass('nativeMultiple');
				$("<div class='nativeMultiple-one'><div></div></div>").appendTo($wrapper);
				$this.wrap($wrapper);
				
				$wrapper = $this.parents(".nativeMultiple");
				
				var $one = $this.parents(".nativeMultiple-one");
				var $two = $("<div class='nativeMultiple-two'></div>").appendTo($wrapper);
				
				var $clone_input = $this.clone().removeAttr("id").removeAttr("name").appendTo($two).wrap("<div></div>"); //
				
				var max_width = $wrapper.width();
				var one_step = (max_width - 60) / parseFloat($this.attr('max'));
				
				var temp_input = 0;
				var temp_clone_input = 0;
				
				$wrapper.find("div > div").width(max_width);
		
				/**
				 * add events
				 */
				// input 1
				$this.on(touchstart, function() {
					touch_down = true;
				}).on(touchmove, function(e) {
					if(touch_down) {
						inter_value = this.value * one_step;
						temp_clone_input = $clone_input.val();
						
						if(parseFloat(this.value) > parseFloat(temp_clone_input)) {
							$clone_input.val(this.value);
							$one.width(inter_value);
							last_second = this.value;
						}
						
						// event
						if(last_first != this.value) {
							last_first = this.value;
							options.onSlide(this.value, temp_clone_input);
						}
					}
				}).on(touchend, function() {
					inter_value = this.value * one_step;
					touch_down = false;
					last_first = this.value;
					//event
					options.onChange(this.value, $clone_input.val());
				});
				
				// input 2
				$clone_input.on(touchstart, function() {
					console.log("strt");
					touch_down = true;
				}).on(touchmove, function(e) {
					if(touch_down) {
						inter_value = this.value * one_step;
						temp_input = $this.val();
						
						$one.width(inter_value);
						
						if(parseFloat(this.value) < parseFloat(temp_input)) {
							$this.val(this.value);
						}
						
						// event
						if(last_second != this.value) {
							last_second = this.value;
							options.onSlide(temp_input, this.value);
						}
					}
				}).on(touchend, function() {
					inter_value = this.value * one_step;
					touch_down = false;
					$one.width(inter_value);
					//event
					options.onChange($this.val(), this.value);
				});
				
				// change
				$clone_input.val(values[1]);
				$this.val(values[0]);
				$one.width(values[1] * one_step);
				touch_down = false;
			});
			
			options.onCreate();
			
			return this;
        }
		//disable: function {},
		//enable: function {}
    };

	$.fn.nativeMultiple = function(opts) {
        if ( methods[opts] ) {
            return methods[ opts ].apply( this, Array.prototype.slice.call( arguments, 1 ));
        } 
		else if (typeof opts === 'object' || ! opts) {
            // Default to "init"
            return methods.init.apply( this, arguments );
        } 
		else {
            $.error( 'Method ' +  opts + ' does not exist on jQuery.nativeMultiple' );
		}
    };
})( jQuery );