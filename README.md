# TeamSound
go team sound uwu

# To Run

```
node(mon) app.js [LOCAL_IP] [LOCAL_PORT] [TARGET_IP:TARGET_PORT] [SERIAL_PORT]
```

# Project Description

The project setup consists of two parts - a sender and a receiver. Attached to the sender is an Arduino with a Ultrasound sensor. As people walk by the sensor, the sensor reads in values, sends the values over the serialport to a node application through a websocket to the receiver. The receiver would intercept the values and feed into the node application which contains a module called Tone.js that generates a random note based on the incoming input. The sender and the receiver can be kept at two separate locations since they're communicating over a websocket. 

# Limitations

The initial idea was to have the Arduino connected to a Rasperry Pi instead of a laptop. However, the RPi was not the most compatible was npm packages, so we hit a massive roadblock that inhibited a lot of the functionality that we were trying to achieve.
Furthermore, if we added more sockets, we could have had multiple receivers so we could have generated a larger soundscape.

Block diagram can be found here


![alt text](https://image.ibb.co/n09LTy/20180512_161133.jpg)
