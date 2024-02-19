# Common software problems and solutions

## Table of contents
- [Double booking problem (Race condition)](#double-booking-problem-race-condition)
- [Race condition](#race-condition)
- [Deadlock](#deadlock)
- [Pigeon Hole Principle](#pigeon-hole-principle)



<br/>
<br/>
<br/>

## Double booking problem (Race condition)
In a booking system like book my show, when two people are trying to book the same seat, how does it ensure that the seat is booked by only one person, and also make sure the seat gets booked by at least one of them   

**How we dealt with double booking at DocHub**   
We had faced the problem of race condition where multiple patients tried to book same appointment slot at the same time   
How we solved it:   
1. When someone clicks on an appointment slot, temporarily book that slot, other users should see it as temp booked in UI   
1. The temporary booking should be made only for a few seconds or minutes, if the user does not complete payment, release the temp lock
1. Log other users trying to book the slot, if the slot is unbooked, send notifications to other user specifying that the slot is now available for booking

**Learnings on how to deal with double booking problems**   
1. Use transactions to deal with double booking, transactions under the hood work similarly by locking the resource for some time
1. Write test cases, where you hit the booking function with 100 requests and only one should be able to make the booking

<br/>
<br/>

## Race condition

### Dekker's Algorithm
[Race Conditions and How to Prevent Them - A Look at Dekker's Algorithm](https://www.youtube.com/watch?v=MqnpIwN7dz0)

<br/>
<br/>

## Deadlock

<br/>
<br/>


## Pigeon Hole Principle

[What Is the Pigeonhole Principle?](https://www.youtube.com/watch?v=B2A2pGrDG8I)


<br/>
<br/>
