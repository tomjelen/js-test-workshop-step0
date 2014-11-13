'use strict';

var Wolfram = function() {
	
	function render(context) {
		context.append('<input type="text">');
		context.append('<label>');

		context.find('input').on('change', fetchAnswer);

		function fetchAnswer() {
			$.getJSON(
				"api.wolfram-alpha.com/ask-me-anything",
				{ q: context.find('input').val() },
				showAnswer
			);
		}

		function showAnswer(response) {
			context.find('label').text(response.answer);
			context.trigger('queryDone');
		} 
	}

	return {
		render: render
	};
};

describe('wolfram', function() {
	var wolfram, context;
	
	beforeEach(function() {
		wolfram = new Wolfram();
		context = $('<div></div>');
	});

	afterEach(function() {
		$.mockjaxClear();
	});

	it('renders a input field', function() {
		wolfram.render(context);
		expect(context.find('input').length).toBe(1);
	});

	it('show wolfram answers when entering stuff', function(done) {
		wolfram.render(context);

		$.mockjax({
			logging: false,
			url: "api.wolfram-alpha.com/ask-me-anything",
			data: {q: 'something'},
			responseText: {
				status: "success",
				answer: 'You queried for something and got something else'
			}
		});

		context.find('input')
			   .val('something')
			   .trigger('change');

		context.on('queryDone', function() {
			expect(context.find('label').text()).toContain("something");
			done();
		});
	});
});
