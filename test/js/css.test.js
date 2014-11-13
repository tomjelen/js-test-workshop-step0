var Widget = function() {
	var stylesheet = '* { background-color:green; }';

	function render($doc) {
		$('<style></style>')
			.text(stylesheet)
			.appendTo($doc.find('head'));
	}

	return {
		render: render
	}
};

describe('css widget', function() {
	beforeEach(function() {
		this.widget = new Widget();
	});

	it('is green', function() {
		var $iframe  = $('<iframe></iframe>').appendTo('body');
		var $testDocument = $($iframe.get(0).contentDocument);

		this.widget.render($testDocument);

		expect($testDocument.find('body').css('background-color')).toBe('rgb(0, 128, 0)');
	})
});
