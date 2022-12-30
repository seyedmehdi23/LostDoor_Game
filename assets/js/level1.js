
var triggers = [];
var trigger_1 = { pos_x: -63, pos_y: 33, msg: "یه کلید شکسته", one_time_use: false, lock: false };
var trigger_2 = { pos_x: 50, pos_y: 100, action: "console.log('boz')", one_time_use: true, lock: false };

function is_trigger(player_data, trigger_data) {
    var player_x = player_data.x;
    var player_y = player_data.y;
    var x_pos = trigger_data.pos_x;
    var y_pos = trigger_data.pos_y;
    var x_trigger = player_x >= x_pos - trigger_offset && player_x <= x_pos + trigger_offset;
    var y_trigger = player_y >= y_pos - trigger_offset && player_y <= y_pos + trigger_offset;
    return x_trigger && y_trigger;
}

function check_triggers(player_data) {
    var trigger = undefined;
    if (is_trigger(player_data, trigger_1)) if (!trigger_1.lock) trigger = trigger_1;

    if (is_trigger(player_data, trigger_2)) if (!trigger_2.lock) trigger = trigger_2;

    return trigger;
}