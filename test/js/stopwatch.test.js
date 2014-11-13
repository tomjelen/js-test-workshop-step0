var stopWatch = function(window) {
	var time = 0;
	var alarms = {};
	var interval;

	var increment = function() {
		time++;

		if (alarms[time]) {
			alarms[time].forEach(function(alarm) {
				alarm(time);
			});
		}
	};

	var self = { }

	self.start = function() {
		interval = window.setInterval(increment, 1000);
	};
	self.getElapsed = function() {
		return time;
	};
	self.pause = function() {
		window.clearInterval(interval);
	};
	self.resume = function() {
		self.start();
	};
	self.setAlarm = function(timeout, cb) {
		if(!alarms[timeout]) {
			alarms[timeout] = [];
		}
		alarms[timeout].push(cb);
	}
	return self;
};

describe('stopwatch', function() {
	describe('elapsed', function() {
		beforeEach(function() {
			this.stopwatch = stopWatch(window);
			jasmine.clock().install();
		});

		afterEach(function() {
			jasmine.clock().uninstall();
		});

		it('increments with 1 per second', function() {
			this.stopwatch.start();

			jasmine.clock().tick(20*1000);

			expect(this.stopwatch.getElapsed()).toBe(20);
		});


		it('can pause', function() {
			this.stopwatch.start();

			jasmine.clock().tick(20*1000);

			expect(this.stopwatch.getElapsed()).toBe(20);
			this.stopwatch.pause();			

			jasmine.clock().tick(20*1000);
			expect(this.stopwatch.getElapsed()).toBe(20);
		});

		it('can resume after pausing', function() {
			this.stopwatch.start();

			jasmine.clock().tick(20*1000);

			this.stopwatch.pause();			

			jasmine.clock().tick(20*1000);

			this.stopwatch.resume();
			jasmine.clock().tick(20*1000);

			expect(this.stopwatch.getElapsed()).toBe(40);
		});

		it('can set an alarm', function() {
			var alarm = jasmine.createSpy();

			this.stopwatch.setAlarm(20, alarm);
			this.stopwatch.start();
			jasmine.clock().tick(20*1000);

			expect(alarm).toHaveBeenCalledWith(20);
		});

		it('can set multiple alarms', function() {
			var alarm = jasmine.createSpy();

			this.stopwatch.setAlarm(20, alarm);
			this.stopwatch.setAlarm(25, alarm);
			this.stopwatch.start();
			jasmine.clock().tick(20*1000);

			expect(alarm).toHaveBeenCalledWith(20);
			expect(alarm).not.toHaveBeenCalledWith(25);

			jasmine.clock().tick(20*1000);
			expect(alarm).toHaveBeenCalledWith(25);
		});

		it('can set multiple alarms at the same time', function() {
			var alarm = jasmine.createSpy("alarm");
			var alarm2 = jasmine.createSpy("alarm2");

			this.stopwatch.setAlarm(20, alarm);
			this.stopwatch.setAlarm(20, alarm2);
			this.stopwatch.start();
			jasmine.clock().tick(20*1000);

			expect(alarm).toHaveBeenCalledWith(20);
			expect(alarm2).toHaveBeenCalledWith(20);
		});

		xit('can snooze', function() {
			var stopwatch = this.stopwatch;

			var alarm = function(elapsed) {
				var hasSnoozed = false;
				if (!hasSnoozed) {
					hasSnoozed = true;
					stopwatch.snooze(20);
				}
			};

			stopwatch.start();
			jasmine.clock().tick(20*1000);


			// assert something

		});
	});
});
