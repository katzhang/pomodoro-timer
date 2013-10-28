/*Task Countdown Timer*/
var taskTimer = new (function() {

    var $countdown;
    var $form;
    var incrementTime = 70;
    var currentTime = 1500000; // 25 minutes (in milliseconds)
    
    $(function() {

        // Setup the timer
        $countdown = $('#countdown');
        taskTimer.Timer = $.timer(updateTimer, incrementTime, true);

        $('#play').click(function() {
            console.log('clicked play');
            // taskTimer.Timer.toggle();
        });

        // Setup form
        $form = $('#taskTimerform');
        $form.bind('submit', function() {
            taskTimer.resetCountdown();
            return false;
        });

        // $('#play').click(function() {
        //     console.log('clicked play');
        //     taskTimer.Timer.toggle();
        // });

        // $('#stop').click(function() {
        //     taskTimer.resetCountdown()
        // });

    });

    function updateTimer() {

        // Output timer position
        var timeString = formatTime(currentTime);
        $countdown.html(timeString);

        // If timer is complete, trigger alert
        if (currentTime == 0) {
            taskTimer.Timer.stop();
            alert('Example 2: Countdown timer complete!');
            taskTimer.resetCountdown();
            return;
        }

        // Increment timer position
        currentTime -= incrementTime;
        if (currentTime < 0) currentTime = 0;

    }

    this.resetCountdown = function() {
        console.log('resetCountdown');

        // Get time from form
        var newTime = parseInt($form.find('input[type=text]').val()) * 1000;
        if (newTime > 0) {currentTime = newTime;}

        // Stop and reset timer
        taskTimer.Timer.stop().once();

    };

//             $('#play').click(function() {
//             console.log('clicked play');
//             taskTimer.Timer.toggle();
//         });

//         $('#stop').click(function() {
//             taskTimer.resetCountdown()
//         });

// });

        $('#play').click(function() {
            console.log('clicked play');
            taskTimer.Timer.toggle();
        });

        $('#stop').click(function() {
            taskTimer.resetCountdown()
        });


// Common functions
function pad(number, length) {
    var str = '' + number;
    while (str.length < length) {str = '0' + str;}
    return str;
}
function formatTime(time) {
    time = time / 10;
    var min = parseInt(time / 6000),
        sec = parseInt(time / 100) - (min * 60),
        hundredths = pad(time - (sec * 100) - (min * 6000), 2);
    return (min > 0 ? pad(min, 2) : "00") + ":" + pad(sec, 2) + ":" + hundredths;
}
