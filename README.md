# TeamSound
go team sound uwu
(Mateo Juvera Molina, Abdullah Zameek, Ah Ram Cho)

# To Run

```
node(mon) app.js [LOCAL_IP] [LOCAL_PORT] [TARGET_IP:TARGET_PORT] [SERIAL_PORT]
```

# Project Description

When you walk down the corridors of the Arts Center, what do you notice? The random paintings on the wall? The occasional chatter of people? To me, the dominating ambient factor in the Arts Centre is the overwhelming silence that you hear(?) in the corridors. This whitenoise can be overwhelming at times, and thus #TeamSound decided to tackle this existing phenomenon in the Arts Centre, thus "activating" the space. The notion of presence is something that we spoke of a lot as part of the class. But, how could you make presence interactive? What would it take to make people feel awareness of their own presence? Could such a phenomenon even exist? Various methods could be employed to make a person aware of presence - audio, visual, kinesthetic, or some combination of these which would then be a sort of synesthesia. We opted with sound because of the acoustic layout of the Arts Center. The echoes created would provide an ideal environement for the soundscape we wished to achieve. 

The project setup consists of two parts - a sender and a receiver. Attached to the sender is an Arduino with a Ultrasound sensor. As people walk by the sensor, the sensor reads in values, sends the values over the serialport to a node application through a websocket to the receiver. The receiver would intercept the values and feed into the node application which contains a module called Tone.js that generates a random note based on the incoming input. The sender and the receiver can be kept at two separate locations since they're communicating over a websocket. 

# Limitations and Improvements

The initial idea was to have the Arduino connected to a Rasperry Pi instead of a laptop. However, the RPi was not the most compatible was npm packages, so we hit a massive roadblock that inhibited a lot of the functionality that we were trying to achieve.
Furthermore, if we added more sockets, we could have had multiple receivers so we could have generated a larger soundscape.

Additionally, it would be nice to have added an element of familiarity to the soundscape. If we had multiple set-ups in the corridors of the Arts Centre, it woudd have been nice to relay sounds from one section of the Arts Centre to the others. For example, if you're on the east side, it means you're closer to the Dining Hall, so the sounds conveyed from that end would be more related to the sounds you would hear at the dining hall. If there was a setup close to the music rooms, then it would relay sounds from there to a more isolated corridor, filling it up with the various melodies being played.Thus, this would help battle the notion that the Arts Centre corridors are quiet and lifeless, but would also take it a step further, to bring life to it from the other parts of campus.

Block diagram can be found here


![alt text](https://image.ibb.co/jM4yFd/20180512_161133.jpg)
