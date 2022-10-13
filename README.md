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

Just start the tool, create a meeting and add a timeslot for each agenda entry. When the meeting starts you can start the timer. As soon as an agenda entry will run out of time you will be notified about it and you can switch to the next agenda entry.

The meeting agendas will be stored in your browser only. There is no cloud used. Only the page is provided through a cloud service as static files.

As already mentioned, there are many tools already providing this kind of functionallity.

### Features

#### Automatic move to next agenda entry

If this option is selected (via the settings icon in the top left corner of a meeting), the next agenda entry
will be automatiacally be selected after the time has been expired.

If this option is deselected, you have to switch to the next agenda entry via the next button. As long as you
do not switch to the next one, the counter will still be decreased.

#### Adjust start time

This option will adjust the first agenda entry based on the current time.

In case you plan a meeting for 1 hour with 2 agenda entries of 30 min and you start the meeting at 9:05,
the scheduling will not switch at 9:30 to the next agenda entry and you will have a 5 min overtime.

This option shall fix this issue. The first agenda entry will be reduced by 5 min in this case.

The adjustment will only be done according to the duration of the first agenda entry.

In case your first agenda entry if 5 min and you start the meeting at 9:06, nothing will be adjusted, as no "even" time within the last 5 min can be found. You would have the raise the duration to 10 min before starting the meeting in 
this case.

"Even" times means quater steps. 9:00, 9:30 and so on. Thus it would make sense to eather start the meeting in time
or to start you meeting with a "welcome" of 5 to 10 min (especially if you have very short agenda entries). 


### Planned Features

I plan the following details which hopefully make this tool unique and helpfull.

#### Dynamic Timetable

I often have the issue that there is no time left at the end of the meeting for the last agenda point.
The dynamic timetable might help here. 

Example of an agenda an 1 hour meeting:
* Topic 1: 30 min
* Topic 2: 15 min
* Topic 3: 15 min

Expect the the first Topic requires 10 min more time to be discussed. This typical has the impact for the last topic to only be 5 min. As the second topic has been planed for 15 min. In case the second topic even takes more time there is no time left for the last topic.

However dynamic time tables will distribute the available to along with the planned percentaged time slot. So the left 20 min will be splitted into two equal parts of 10 min.

In case of a reduction of an agenda point the additional time will not be splitted. Use the time to close the meeting earlier.

#### Online Sharing of the Agenda

Especially when agendas are dynamicly changed, it is very hard for the participants to take care of the time table. Sharing the agenda via screen sharing might be an option. But with multiple presenters it is hard to follow.

Thus I plan to introduce a P2P communication of the tool based on WebRTC. I don't like to store data centrally, so I think this might be a good solution.
More details can be found in the [development section](DEVELOPMENT.md). 

## Release Notes

### V0.4.0

* Add agenda entry changed (no empty entry in meeting anymore, dedicated blank entry instead)

### V0.3.2

* Sound fixed in case of manual agenda entry switch

### V0.3.1

* Sound file paths fixed for distribution

### V0.3.0

* Bottom navigation
* Separated edit and timer view
* Automatic save of changed removed
* Progress moved to Meeting view instead of each agenda
* Dragable agenda entries
* Navigation (previous/next)
* Agenda time in minutes and seconds
* Sound added
* Option to deactivate automatice switch to next agenda entry
* Remove difference between last full hour/half hour and current time from first agenda entry

### V0.2.0

* Timer added
* New: PWA (askes for) updates automatically after restart

### V0.1.2

* Fix: reference to data fixed
* New: Back propagation of agenda time and meeting time calculation

### V0.1.1

Initial version with the following basic features
* List of meetings with delete functionallity
* Create new meetings
* Application can be used offline

## Next Features

* Show overall meeting progress additionally
* Automatic meeting duration adjustment (reduce time of following agenda entries in case of overtimes)
* Add additional time to active agenda entry via button
* Reduce time of active agenda entry via button
* Add agenda entry via button instead of automatic adding
* Wider layout for larger screens

## License

Agenda is licensed under the [MIT License](https://tldrlegal.com/l/mit)


### Sound File License

"Free Sounds Library"

Free Sound Effects Site.

Licence: License: Attribution 4.0 International (CC BY 4.0). You are allowed to use sound effects free of charge and royalty free in your multimedia projects for commercial or non-commercial purposes.

http://www.freesoundslibrary.com