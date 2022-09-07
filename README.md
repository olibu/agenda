# Agenda

## Introduction

Agenda is a browser based standalone tool to track the time table of meetings.

You can use the tool directly on [my github page](https://olibu.github.io/agenda).

You might ask why there is another tool to this. And you are right.
I really love the [Online Timer App](https://webuhr.de/timer/). I use it very often for standup meetings.
For more complex meetings I like the [Timebocks App](https://timeblocks.co/). Timeblocks is a closed source free to use for non-commercial. This makes it somehow unattractive for me. It looks great but it seems to get commercial somewhen.

## Technologic Details

As not everyone is interested in technologic details I will provide them [here](DEVELOPMENT.md).

## User Guide

The tool is mentioned the be intuitive. Thus there is no need to provide a user guide ;)

Just start the tool, create meeting and add a timeslot for each agenda entry. When the meeting strats you can start the timer. As soon as an agenda entry will run out of time you will be notified about it and you can switch to the next agenda entry.

The meeting agendas will be stored in your browser only. There is cloud used. Only the page might be provided through a cloud service in future.

As already mentioned, there are many tools already providing this functionallity.

I plan the following details which hopefully make this tool unique and helpfull.

### Dynamic Timetable

I often have the issue that there is no time left at the end of the meeting for the last agenda point.
The dynamic timetable might help here. 

Example of an agenda an 1 hour meeting:
* Topic 1: 30 min
* Topic 2: 15 min
* Topic 3: 15 min

Expect the the first Topic requires 10 min more time to be discussed. This typical has the impact for the last topic to only be 5 min. As the second topic has been planed for 15 min. In case the second topic even takes more time there is no time left for the last topic.

However dynamic time tables will distribute the available to along with the planned percentaged time slot. So the left 20 min will be splitted into two equal parts of 10 min.

In case of a reduction of an agenda point the additional time will not be splitted. Use the time to close the meeting earlier.

### Online Sharing of the Agenda

Especially when agendas are dynamicly changed, it is very hard for the participants to take care of the time table. Sharing the agenda via screen sharing might be an option. But with multiple presenters it is hard to follow.

Thus I plan to introduce a P2P communication of the tool based on WebRTC. I don't like to store data centrally, so I think this might be a good solution.
More details can be found in the [development section](DEVELOPMENT.md). 

## Release Notes

### V.0.1.2

* Fix: reference to data fixed
* New: Back propagation of agenda time and meeting time calculation

### V.0.1.1

Initial version with the following basic features
* List of meetings with delete functionallity
* Create new meetings
* Application can be used offline

## License

Agenda is licensed under the [MIT License](https://tldrlegal.com/l/mit)