/*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
 ______ ______ ______ __ __ __ ______
 /\ == \ /\ __ \ /\__ _\ /\ \/ / /\ \ /\__ _\
 \ \ __< \ \ \/\ \ \/_/\ \/ \ \ _"-. \ \ \ \/_/\ \/
 \ \_____\ \ \_____\ \ \_\ \ \_\ \_\ \ \_\ \ \_\
 \/_____/ \/_____/ \/_/ \/_/\/_/ \/_/ \/_/
 This is a sample Slack bot built with Botkit.
 This bot demonstrates many of the core features of Botkit:
 * Connect to Slack using the real time API
 * Receive messages based on "spoken" patterns
 * Reply to messages
 * Use the conversation system to ask questions
 * Use the built in storage system to store and retrieve information
 for a user.
 # RUN THE BOT:
 Get a Bot token from Slack:
 -> http://my.slack.com/services/new/bot
 Run your bot from the command line:
 set token=<MY TOKEN>
 node bot.js
 # USE THE BOT:
 Find your bot inside Slack to send it a direct message.
 Say: "Hello"
 The bot will reply "Hello!"
 Say: "who are you?"
 The bot will tell you its name, where it running, and for how long.
 Say: "Call me <nickname>"
 Tell the bot your nickname. Now you are friends.
 Say: "who am I?"
 The bot will tell you your nickname, if it knows one for you.
 Say: "shutdown"
 The bot will ask if you are sure, and then shut itself down.
 Make sure to invite your bot into other channels using /invite @<my bot>!
 # EXTEND THE BOT:
 Botkit is has many features for building cool and useful bots!
 Read all about it here:
 -> http://howdy.ai/botkit
 ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/
if (!process.env.token) {
    console.log('Error: Specify token in environment');
    process.exit(1);
}
var weather = require('weather-js');
var MathHelper = require('./botmath.js');
var Botkit = require('./lib/Botkit.js');
var os = require('os');
<<<<<<< HEAD

=======
>>>>>>> 53f857728fbc05b8033e000c1e6f1ee5b215104b
var botmath = require('./botmath.js');

var controller = Botkit.slackbot({
    debug: true,
});
var bot = controller.spawn({
    token: process.env.token
}).startRTM();
controller.hears(['hello', 'hi'], 'direct_message,direct_mention,mention', function (bot, message) {
    bot.api.reactions.add({
        timestamp: message.ts,
        channel: message.channel,
        name: 'robot_face',
    }, function (err, res) {
        if (err) {
            bot.botkit.log('Failed to add emoji reaction :(', err);
        }
    });
    controller.storage.users.get(message.user, function (err, user) {
        if (user && user.name) {
            bot.reply(message, 'Hello ' + user.name + '!!');
        } else {
            bot.reply(message, 'Hello.');
        }
    });
});
controller.hears(['call me (.*)'], 'direct_message,direct_mention,mention', function (bot, message) {
    var matches = message.text.match(/call me (.*)/i);
    var name = matches[1];
    controller.storage.users.get(message.user, function (err, user) {
        if (!user) {
            user = {
                id: message.user,
            };
        }
        user.name = name;
        controller.storage.users.save(user, function (err, id) {
            bot.reply(message, 'Got it. I will call you ' + user.name + ' from now on.');
        });
    });
});
controller.hears(['what is my name', 'who am i'], 'direct_message,direct_mention,mention', function (bot, message) {
    controller.storage.users.get(message.user, function (err, user) {
        if (user && user.name) {
            bot.reply(message, 'Your name is ' + user.name);
        } else {
            bot.reply(message, 'I don\'t know yet!');
        }
    });
});
controller.hears(['shutdown'], 'direct_message,direct_mention,mention', function (bot, message) {
    bot.startConversation(message, function (err, convo) {
        convo.ask('Are you sure you want me to shutdown?', [
            {
                pattern: bot.utterances.yes,
                callback: function (response, convo) {
                    convo.say('Bye!');
                    convo.next();
                    setTimeout(function () {
                        process.exit();
                    }, 3000);
                }
            },
            {
                pattern: bot.utterances.no,
                default: true,
                callback: function (response, convo) {
                    convo.say('*Phew!*');
                    convo.next();
                }
            }
        ]);
    });
});
controller.hears(['uptime', 'identify yourself', 'who are you', 'what is your name'], 'direct_message,direct_mention,mention', function (bot, message) {
    var hostname = os.hostname();
    var uptime = formatUptime(process.uptime());
    bot.reply(message, ':robot_face: I am a bot named <@' + bot.identity.name + '>. I have been running for ' + uptime + ' on ' + hostname + '.');
});
controller.hears(['fibonacci'], 'direct_message,direct_mention,mention', function (bot, message) {
    if (message.text === 'fibonacci') {
        bot.reply(message, '1, 1, 2, 3, 5');
    }
});

controller.hears(['fibonacci (.*)'], 'direct_message,mention', function (bot, message) {
    var num = message.match[1];
    if (isFibonacci(num) == 1) {
        var i = 0;
        var s = "";
        for (i = 0; i < 5; i++) {
            num = findnextFibonacci(num);
            s = s + ', ' + num;
        }
        bot.reply(message, 'your number is a fibonacci number, the following 5 fibonacci numbers are' + s);
    } else {
        bot.reply(message, 'your number is not a fibonacci number');
    }



});
function isFibonacci(number) {
    var prev = 0;
    var curr = 1;
    while (prev <= number) {
        if (prev == number) {
            return 1;
        }
        curr = prev + curr;
        prev = curr - prev;
    }

}
function findnextFibonacci(lowerLimit) {

    for (lowerLimit++; !isFibonacci(lowerLimit); lowerLimit++)
        ;
    return lowerLimit;
}

function formatUptime(uptime) {
    var unit = 'second';
    if (uptime > 60) {
        uptime = uptime / 60;
        unit = 'minute';
    }
    if (uptime > 60) {
        uptime = uptime / 60;
        unit = 'hour';
    }
    if (uptime != 1) {
        unit = unit + 's';
    }
    uptime = uptime + ' ' + unit;
    return uptime;
}
<<<<<<< HEAD

=======
>>>>>>> 53f857728fbc05b8033e000c1e6f1ee5b215104b
controller.hears('prime', ['direct_message', 'direct_mention', 'mention'], function (bot, message) {
    if (message.text === "prime") {
        return bot.reply(message, '2, 3, 5, 7, 11, 13, 17, 19, 23, 29');
    }
});

controller.hears('prime (.*)', ['direct_message', 'direct_mention', 'mention'], function (bot, message) {
    var parameter = parseInt(message.match[1]);
    if (MathHelper.isPrime(parameter)) {
        var primes = new Array();
        var number = parameter - 1;
        while (primes.length < 10) {
            if (MathHelper.isPrime(number)) {
                primes.push(number);
            }
            number--;
        }
        var reply = "";
        for (var i = 0; i < primes.length; i++) {
            reply += primes[i] + " ";
        }
        return bot.reply(message, reply);
    } else {
        return bot.reply(message, "your parameter: " + parameter + " is not Prime number");
    }
});

controller.hears(['How is the weather in (.*)'], 'direct_message,mention', function (bot, message) {
    var city = message.match[1];
    weather.find({search: city, degreeType: 'C'}, function (err, result) {
        return bot.reply(message, 'The weather in ' + result[0]["location"]["name"] + " is " + result[0]["current"]["temperature"] + "C and it is " + result[0]["current"]["skytext"]);
        
        
        if (err)
            console.log(err);

        console.log(JSON.stringify(result, null, 2));
        
        
    });
});
<<<<<<< HEAD

=======
>>>>>>> 53f857728fbc05b8033e000c1e6f1ee5b215104b

controller.hears('what is (.*) \\+ (.*)',['direct_message', 'direct_mention', 'mention'],function(bot,message) {

	var num1 = message.match[1];
	var num2 = message.match[2];
		
	if (num1 != null && num2 != null) {
		return bot.reply(message, num1 + ' + ' + num2 + ' = ' + botmath.sum(num1, num2));
	}
});
<<<<<<< HEAD

=======
>>>>>>> 53f857728fbc05b8033e000c1e6f1ee5b215104b
