/*Task Countdown Timer*/


    var $countdown;
    var $form;
    var incrementTime = 70;
    var currentTime = 1500000; // 25 minutes (in milliseconds)
    var taskTimer = $.timer(updateTimer, incrementTime, true);
    


        // Setup the timer
    $countdown = $('#countdown')


    // Setup form
    $form = $('#taskTimerform');
    $form.bind('submit', function() {
        resetCountdown();
        return false;
    });


    function updateTimer() {

        // Output timer position
        var timeString = formatTime(currentTime);
        $countdown.html(timeString);

        // If timer is complete, trigger alert
        if (currentTime == 0) {
            taskTimer.stop();
            alert('Example 2: Countdown timer complete!');
            taskTimer.resetCountdown();
            return;
        }

        // Increment timer position
        currentTime -= incrementTime;
        if (currentTime < 0) currentTime = 0;

    }

    function resetCountdown() {
        console.log('resetCountdown');

        // Get time from form
        var newTime = parseInt($form.find('input[type=text]').val()) * 1000;
        if (newTime > 0) {currentTime = newTime;}

        // Stop and reset timer
        taskTimer.stop().once();

    };


    $('#play').click(function() {
        taskTimer.toggle();
    });

    $('#stop').click(function() {
        resetCountdown()
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
