import { useEffect, useState } from "react";
import { Box } from "@mui/material";
import * as React from "react";
// import { LineChart } from "@mui/x-charts/LineChart";
import { ResponsiveContainer, LineChart, Line, XAxis, Tooltip } from "recharts";

const test = {
  "_id": "65156322b16ca787c5144571",
  "printer_id": "65082196ef2033988448587d",
  "address": "8.8.4.4",
  "time": {
      "year": "2023",
      "month": "ספטמבר",
      "day": "28",
      "weekday": "חמישי",
      "hours": 14,
      "minutes": 27
  },
  "online": 1,
  "date": "2023-09-28T11:27:30.558Z",
  "__v": 0
}

let data = [
  {
      "_id": "65156322b16ca787c5144571",
      "printer_id": "65082196ef2033988448587d",
      "address": "8.8.4.4",
      "time": {
          "year": "2023",
          "month": "ספטמבר",
          "day": "28",
          "weekday": "חמישי",
          "hours": 14,
          "minutes": 27
      },
      "online": 1,
      "date": "2023-09-28T11:27:30.558Z",
      "__v": 0
  },
  {
      "_id": "65156340b16ca787c51445b2",
      "printer_id": "65082196ef2033988448587d",
      "address": "8.8.4.4",
      "time": {
          "year": "2023",
          "month": "ספטמבר",
          "day": "28",
          "weekday": "חמישי",
          "hours": 14,
          "minutes": 28
      },
      "online": 1,
      "date": "2023-09-28T11:28:00.553Z",
      "__v": 0
  },
  {
      "_id": "6515635eb16ca787c51445f4",
      "printer_id": "65082196ef2033988448587d",
      "address": "8.8.4.4",
      "time": {
          "year": "2023",
          "month": "ספטמבר",
          "day": "28",
          "weekday": "חמישי",
          "hours": 14,
          "minutes": 28
      },
      "online": 1,
      "date": "2023-09-28T11:28:30.548Z",
      "__v": 0
  },
  {
      "_id": "65156af6c0033755ea600dec",
      "printer_id": "65082196ef2033988448587d",
      "address": "8.8.4.4",
      "time": {
          "year": "2023",
          "month": "ספטמבר",
          "day": "28",
          "weekday": "חמישי",
          "hours": 15,
          "minutes": 0
      },
      "online": 1,
      "date": "2023-09-28T12:00:54.057Z",
      "__v": 0
  },
  {
      "_id": "65156b14c0033755ea600e2d",
      "printer_id": "65082196ef2033988448587d",
      "address": "8.8.4.4",
      "time": {
          "year": "2023",
          "month": "ספטמבר",
          "day": "28",
          "weekday": "חמישי",
          "hours": 15,
          "minutes": 1
      },
      "online": 1,
      "date": "2023-09-28T12:01:24.051Z",
      "__v": 0
  },
  {
      "_id": "65156b32c0033755ea600e6e",
      "printer_id": "65082196ef2033988448587d",
      "address": "8.8.4.4",
      "time": {
          "year": "2023",
          "month": "ספטמבר",
          "day": "28",
          "weekday": "חמישי",
          "hours": 15,
          "minutes": 1
      },
      "online": 1,
      "date": "2023-09-28T12:01:54.054Z",
      "__v": 0
  },
  {
      "_id": "65156b50c0033755ea600eb0",
      "printer_id": "65082196ef2033988448587d",
      "address": "8.8.4.4",
      "time": {
          "year": "2023",
          "month": "ספטמבר",
          "day": "28",
          "weekday": "חמישי",
          "hours": 15,
          "minutes": 2
      },
      "online": 1,
      "date": "2023-09-28T12:02:24.057Z",
      "__v": 0
  },
  {
      "_id": "65156b6ec0033755ea600ef1",
      "printer_id": "65082196ef2033988448587d",
      "address": "8.8.4.4",
      "time": {
          "year": "2023",
          "month": "ספטמבר",
          "day": "28",
          "weekday": "חמישי",
          "hours": 15,
          "minutes": 2
      },
      "online": 1,
      "date": "2023-09-28T12:02:54.058Z",
      "__v": 0
  },
  {
      "_id": "65156b8cc0033755ea600f32",
      "printer_id": "65082196ef2033988448587d",
      "address": "8.8.4.4",
      "time": {
          "year": "2023",
          "month": "ספטמבר",
          "day": "28",
          "weekday": "חמישי",
          "hours": 15,
          "minutes": 3
      },
      "online": 1,
      "date": "2023-09-28T12:03:24.060Z",
      "__v": 0
  },
  {
      "_id": "65156c026b4e3fe5925048c9",
      "printer_id": "65082196ef2033988448587d",
      "address": "8.8.4.4",
      "time": {
          "year": "2023",
          "month": "ספטמבר",
          "day": "28",
          "weekday": "חמישי",
          "hours": 15,
          "minutes": 5
      },
      "online": 1,
      "date": "2023-09-28T12:05:22.062Z",
      "__v": 0
  },
  {
      "_id": "65156d8fd537591443918a18",
      "printer_id": "65082196ef2033988448587d",
      "address": "8.8.4.4",
      "time": {
          "year": "2023",
          "month": "ספטמבר",
          "day": "28",
          "weekday": "חמישי",
          "hours": 15,
          "minutes": 11
      },
      "online": 1,
      "date": "2023-09-28T12:11:59.565Z",
      "__v": 0
  },
  {
      "_id": "65156dc8a574bce348fe9c70",
      "printer_id": "65082196ef2033988448587d",
      "address": "8.8.4.4",
      "time": {
          "year": "2023",
          "month": "ספטמבר",
          "day": "28",
          "weekday": "חמישי",
          "hours": 15,
          "minutes": 12
      },
      "online": 1,
      "date": "2023-09-28T12:12:56.562Z",
      "__v": 0
  },
  {
      "_id": "65156de6a574bce348fe9cb1",
      "printer_id": "65082196ef2033988448587d",
      "address": "8.8.4.4",
      "time": {
          "year": "2023",
          "month": "ספטמבר",
          "day": "28",
          "weekday": "חמישי",
          "hours": 15,
          "minutes": 13
      },
      "online": 1,
      "date": "2023-09-28T12:13:26.553Z",
      "__v": 0
  },
  {
      "_id": "65156e04a574bce348fe9cf2",
      "printer_id": "65082196ef2033988448587d",
      "address": "8.8.4.4",
      "time": {
          "year": "2023",
          "month": "ספטמבר",
          "day": "28",
          "weekday": "חמישי",
          "hours": 15,
          "minutes": 13
      },
      "online": 1,
      "date": "2023-09-28T12:13:56.558Z",
      "__v": 0
  },
  {
      "_id": "65156e22a574bce348fe9d33",
      "printer_id": "65082196ef2033988448587d",
      "address": "8.8.4.4",
      "time": {
          "year": "2023",
          "month": "ספטמבר",
          "day": "28",
          "weekday": "חמישי",
          "hours": 15,
          "minutes": 14
      },
      "online": 1,
      "date": "2023-09-28T12:14:26.546Z",
      "__v": 0
  },
  {
      "_id": "65156e40a574bce348fe9d74",
      "printer_id": "65082196ef2033988448587d",
      "address": "8.8.4.4",
      "time": {
          "year": "2023",
          "month": "ספטמבר",
          "day": "28",
          "weekday": "חמישי",
          "hours": 15,
          "minutes": 14
      },
      "online": 1,
      "date": "2023-09-28T12:14:56.560Z",
      "__v": 0
  },
  {
      "_id": "65156e5ea574bce348fe9db5",
      "printer_id": "65082196ef2033988448587d",
      "address": "8.8.4.4",
      "time": {
          "year": "2023",
          "month": "ספטמבר",
          "day": "28",
          "weekday": "חמישי",
          "hours": 15,
          "minutes": 15
      },
      "online": 1,
      "date": "2023-09-28T12:15:26.559Z",
      "__v": 0
  },
  {
      "_id": "65156e7ca574bce348fe9df6",
      "printer_id": "65082196ef2033988448587d",
      "address": "8.8.4.4",
      "time": {
          "year": "2023",
          "month": "ספטמבר",
          "day": "28",
          "weekday": "חמישי",
          "hours": 15,
          "minutes": 15
      },
      "online": 1,
      "date": "2023-09-28T12:15:56.557Z",
      "__v": 0
  },
  {
      "_id": "65156e9aa574bce348fe9e37",
      "printer_id": "65082196ef2033988448587d",
      "address": "8.8.4.4",
      "time": {
          "year": "2023",
          "month": "ספטמבר",
          "day": "28",
          "weekday": "חמישי",
          "hours": 15,
          "minutes": 16
      },
      "online": 1,
      "date": "2023-09-28T12:16:26.560Z",
      "__v": 0
  },
  {
      "_id": "65156eb8a574bce348fe9e78",
      "printer_id": "65082196ef2033988448587d",
      "address": "8.8.4.4",
      "time": {
          "year": "2023",
          "month": "ספטמבר",
          "day": "28",
          "weekday": "חמישי",
          "hours": 15,
          "minutes": 16
      },
      "online": 1,
      "date": "2023-09-28T12:16:56.558Z",
      "__v": 0
  },
  {
      "_id": "65156ed6a574bce348fe9eb9",
      "printer_id": "65082196ef2033988448587d",
      "address": "8.8.4.4",
      "time": {
          "year": "2023",
          "month": "ספטמבר",
          "day": "28",
          "weekday": "חמישי",
          "hours": 15,
          "minutes": 17
      },
      "online": 1,
      "date": "2023-09-28T12:17:26.557Z",
      "__v": 0
  },
  {
      "_id": "65156ef4a574bce348fe9efa",
      "printer_id": "65082196ef2033988448587d",
      "address": "8.8.4.4",
      "time": {
          "year": "2023",
          "month": "ספטמבר",
          "day": "28",
          "weekday": "חמישי",
          "hours": 15,
          "minutes": 17
      },
      "online": 1,
      "date": "2023-09-28T12:17:56.560Z",
      "__v": 0
  },
  {
      "_id": "65156f13a574bce348fe9f3b",
      "printer_id": "65082196ef2033988448587d",
      "address": "8.8.4.4",
      "time": {
          "year": "2023",
          "month": "ספטמבר",
          "day": "28",
          "weekday": "חמישי",
          "hours": 15,
          "minutes": 18
      },
      "online": 1,
      "date": "2023-09-28T12:18:27.552Z",
      "__v": 0
  },
  {
      "_id": "65156f31a574bce348fe9f7c",
      "printer_id": "65082196ef2033988448587d",
      "address": "8.8.4.4",
      "time": {
          "year": "2023",
          "month": "ספטמבר",
          "day": "28",
          "weekday": "חמישי",
          "hours": 15,
          "minutes": 18
      },
      "online": 1,
      "date": "2023-09-28T12:18:57.059Z",
      "__v": 0
  },
  {
      "_id": "65156f4fa574bce348fe9fbd",
      "printer_id": "65082196ef2033988448587d",
      "address": "8.8.4.4",
      "time": {
          "year": "2023",
          "month": "ספטמבר",
          "day": "28",
          "weekday": "חמישי",
          "hours": 15,
          "minutes": 19
      },
      "online": 1,
      "date": "2023-09-28T12:19:27.062Z",
      "__v": 0
  },
  {
      "_id": "65156f6da574bce348fe9ffe",
      "printer_id": "65082196ef2033988448587d",
      "address": "8.8.4.4",
      "time": {
          "year": "2023",
          "month": "ספטמבר",
          "day": "28",
          "weekday": "חמישי",
          "hours": 15,
          "minutes": 19
      },
      "online": 1,
      "date": "2023-09-28T12:19:57.046Z",
      "__v": 0
  },
  {
      "_id": "65156f8ba574bce348fea03f",
      "printer_id": "65082196ef2033988448587d",
      "address": "8.8.4.4",
      "time": {
          "year": "2023",
          "month": "ספטמבר",
          "day": "28",
          "weekday": "חמישי",
          "hours": 15,
          "minutes": 20
      },
      "online": 1,
      "date": "2023-09-28T12:20:27.053Z",
      "__v": 0
  },
  {
      "_id": "65156fa9a574bce348fea080",
      "printer_id": "65082196ef2033988448587d",
      "address": "8.8.4.4",
      "time": {
          "year": "2023",
          "month": "ספטמבר",
          "day": "28",
          "weekday": "חמישי",
          "hours": 15,
          "minutes": 20
      },
      "online": 1,
      "date": "2023-09-28T12:20:57.048Z",
      "__v": 0
  },
  {
      "_id": "65156fc7a574bce348fea0c1",
      "printer_id": "65082196ef2033988448587d",
      "address": "8.8.4.4",
      "time": {
          "year": "2023",
          "month": "ספטמבר",
          "day": "28",
          "weekday": "חמישי",
          "hours": 15,
          "minutes": 21
      },
      "online": 1,
      "date": "2023-09-28T12:21:27.054Z",
      "__v": 0
  },
  {
      "_id": "65156fe5a574bce348fea102",
      "printer_id": "65082196ef2033988448587d",
      "address": "8.8.4.4",
      "time": {
          "year": "2023",
          "month": "ספטמבר",
          "day": "28",
          "weekday": "חמישי",
          "hours": 15,
          "minutes": 21
      },
      "online": 1,
      "date": "2023-09-28T12:21:57.060Z",
      "__v": 0
  },
  {
      "_id": "65157003a574bce348fea143",
      "printer_id": "65082196ef2033988448587d",
      "address": "8.8.4.4",
      "time": {
          "year": "2023",
          "month": "ספטמבר",
          "day": "28",
          "weekday": "חמישי",
          "hours": 15,
          "minutes": 22
      },
      "online": 1,
      "date": "2023-09-28T12:22:27.048Z",
      "__v": 0
  },
  {
      "_id": "65157021a574bce348fea184",
      "printer_id": "65082196ef2033988448587d",
      "address": "8.8.4.4",
      "time": {
          "year": "2023",
          "month": "ספטמבר",
          "day": "28",
          "weekday": "חמישי",
          "hours": 15,
          "minutes": 22
      },
      "online": 1,
      "date": "2023-09-28T12:22:57.050Z",
      "__v": 0
  },
  {
      "_id": "6515703fa574bce348fea1c5",
      "printer_id": "65082196ef2033988448587d",
      "address": "8.8.4.4",
      "time": {
          "year": "2023",
          "month": "ספטמבר",
          "day": "28",
          "weekday": "חמישי",
          "hours": 15,
          "minutes": 23
      },
      "online": 1,
      "date": "2023-09-28T12:23:27.047Z",
      "__v": 0
  },
  {
      "_id": "6515705da574bce348fea206",
      "printer_id": "65082196ef2033988448587d",
      "address": "8.8.4.4",
      "time": {
          "year": "2023",
          "month": "ספטמבר",
          "day": "28",
          "weekday": "חמישי",
          "hours": 15,
          "minutes": 23
      },
      "online": 1,
      "date": "2023-09-28T12:23:57.054Z",
      "__v": 0
  },
  {
      "_id": "6515707ba574bce348fea247",
      "printer_id": "65082196ef2033988448587d",
      "address": "8.8.4.4",
      "time": {
          "year": "2023",
          "month": "ספטמבר",
          "day": "28",
          "weekday": "חמישי",
          "hours": 15,
          "minutes": 24
      },
      "online": 1,
      "date": "2023-09-28T12:24:27.059Z",
      "__v": 0
  },
  {
      "_id": "65157099a574bce348fea288",
      "printer_id": "65082196ef2033988448587d",
      "address": "8.8.4.4",
      "time": {
          "year": "2023",
          "month": "ספטמבר",
          "day": "28",
          "weekday": "חמישי",
          "hours": 15,
          "minutes": 24
      },
      "online": 1,
      "date": "2023-09-28T12:24:57.057Z",
      "__v": 0
  },
  {
      "_id": "651570b7a574bce348fea2c9",
      "printer_id": "65082196ef2033988448587d",
      "address": "8.8.4.4",
      "time": {
          "year": "2023",
          "month": "ספטמבר",
          "day": "28",
          "weekday": "חמישי",
          "hours": 15,
          "minutes": 25
      },
      "online": 1,
      "date": "2023-09-28T12:25:27.051Z",
      "__v": 0
  },
  {
      "_id": "651570d5a574bce348fea30a",
      "printer_id": "65082196ef2033988448587d",
      "address": "8.8.4.4",
      "time": {
          "year": "2023",
          "month": "ספטמבר",
          "day": "28",
          "weekday": "חמישי",
          "hours": 15,
          "minutes": 25
      },
      "online": 1,
      "date": "2023-09-28T12:25:57.060Z",
      "__v": 0
  },
  {
      "_id": "651570f3a574bce348fea34b",
      "printer_id": "65082196ef2033988448587d",
      "address": "8.8.4.4",
      "time": {
          "year": "2023",
          "month": "ספטמבר",
          "day": "28",
          "weekday": "חמישי",
          "hours": 15,
          "minutes": 26
      },
      "online": 1,
      "date": "2023-09-28T12:26:27.061Z",
      "__v": 0
  },
  {
      "_id": "65157111a574bce348fea38c",
      "printer_id": "65082196ef2033988448587d",
      "address": "8.8.4.4",
      "time": {
          "year": "2023",
          "month": "ספטמבר",
          "day": "28",
          "weekday": "חמישי",
          "hours": 15,
          "minutes": 26
      },
      "online": 1,
      "date": "2023-09-28T12:26:57.059Z",
      "__v": 0
  },
  {
      "_id": "6515712fa574bce348fea3cd",
      "printer_id": "65082196ef2033988448587d",
      "address": "8.8.4.4",
      "time": {
          "year": "2023",
          "month": "ספטמבר",
          "day": "28",
          "weekday": "חמישי",
          "hours": 15,
          "minutes": 27
      },
      "online": 1,
      "date": "2023-09-28T12:27:27.052Z",
      "__v": 0
  },
  {
      "_id": "6515714da574bce348fea40e",
      "printer_id": "65082196ef2033988448587d",
      "address": "8.8.4.4",
      "time": {
          "year": "2023",
          "month": "ספטמבר",
          "day": "28",
          "weekday": "חמישי",
          "hours": 15,
          "minutes": 27
      },
      "online": 1,
      "date": "2023-09-28T12:27:57.063Z",
      "__v": 0
  },
  {
      "_id": "6515716ba574bce348fea44f",
      "printer_id": "65082196ef2033988448587d",
      "address": "8.8.4.4",
      "time": {
          "year": "2023",
          "month": "ספטמבר",
          "day": "28",
          "weekday": "חמישי",
          "hours": 15,
          "minutes": 28
      },
      "online": 1,
      "date": "2023-09-28T12:28:27.052Z",
      "__v": 0
  },
  {
      "_id": "65157189a574bce348fea490",
      "printer_id": "65082196ef2033988448587d",
      "address": "8.8.4.4",
      "time": {
          "year": "2023",
          "month": "ספטמבר",
          "day": "28",
          "weekday": "חמישי",
          "hours": 15,
          "minutes": 28
      },
      "online": 1,
      "date": "2023-09-28T12:28:57.054Z",
      "__v": 0
  },
  {
      "_id": "651571a7a574bce348fea4d1",
      "printer_id": "65082196ef2033988448587d",
      "address": "8.8.4.4",
      "time": {
          "year": "2023",
          "month": "ספטמבר",
          "day": "28",
          "weekday": "חמישי",
          "hours": 15,
          "minutes": 29
      },
      "online": 1,
      "date": "2023-09-28T12:29:27.058Z",
      "__v": 0
  },
  {
      "_id": "651571c5a574bce348fea512",
      "printer_id": "65082196ef2033988448587d",
      "address": "8.8.4.4",
      "time": {
          "year": "2023",
          "month": "ספטמבר",
          "day": "28",
          "weekday": "חמישי",
          "hours": 15,
          "minutes": 29
      },
      "online": 1,
      "date": "2023-09-28T12:29:57.053Z",
      "__v": 0
  },
  {
      "_id": "651571e3a574bce348fea553",
      "printer_id": "65082196ef2033988448587d",
      "address": "8.8.4.4",
      "time": {
          "year": "2023",
          "month": "ספטמבר",
          "day": "28",
          "weekday": "חמישי",
          "hours": 15,
          "minutes": 30
      },
      "online": 1,
      "date": "2023-09-28T12:30:27.061Z",
      "__v": 0
  },
  {
      "_id": "65157201a574bce348fea594",
      "printer_id": "65082196ef2033988448587d",
      "address": "8.8.4.4",
      "time": {
          "year": "2023",
          "month": "ספטמבר",
          "day": "28",
          "weekday": "חמישי",
          "hours": 15,
          "minutes": 30
      },
      "online": 1,
      "date": "2023-09-28T12:30:57.049Z",
      "__v": 0
  },
  {
      "_id": "6515721fa574bce348fea5d5",
      "printer_id": "65082196ef2033988448587d",
      "address": "8.8.4.4",
      "time": {
          "year": "2023",
          "month": "ספטמבר",
          "day": "28",
          "weekday": "חמישי",
          "hours": 15,
          "minutes": 31
      },
      "online": 1,
      "date": "2023-09-28T12:31:27.059Z",
      "__v": 0
  },
  {
      "_id": "6515723da574bce348fea616",
      "printer_id": "65082196ef2033988448587d",
      "address": "8.8.4.4",
      "time": {
          "year": "2023",
          "month": "ספטמבר",
          "day": "28",
          "weekday": "חמישי",
          "hours": 15,
          "minutes": 31
      },
      "online": 1,
      "date": "2023-09-28T12:31:57.057Z",
      "__v": 0
  },
  {
      "_id": "6515725ba574bce348fea657",
      "printer_id": "65082196ef2033988448587d",
      "address": "8.8.4.4",
      "time": {
          "year": "2023",
          "month": "ספטמבר",
          "day": "28",
          "weekday": "חמישי",
          "hours": 15,
          "minutes": 32
      },
      "online": 1,
      "date": "2023-09-28T12:32:27.054Z",
      "__v": 0
  },
  {
      "_id": "65157279a574bce348fea698",
      "printer_id": "65082196ef2033988448587d",
      "address": "8.8.4.4",
      "time": {
          "year": "2023",
          "month": "ספטמבר",
          "day": "28",
          "weekday": "חמישי",
          "hours": 15,
          "minutes": 32
      },
      "online": 1,
      "date": "2023-09-28T12:32:57.050Z",
      "__v": 0
  },
  {
      "_id": "65157297a574bce348fea6d9",
      "printer_id": "65082196ef2033988448587d",
      "address": "8.8.4.4",
      "time": {
          "year": "2023",
          "month": "ספטמבר",
          "day": "28",
          "weekday": "חמישי",
          "hours": 15,
          "minutes": 33
      },
      "online": 1,
      "date": "2023-09-28T12:33:27.052Z",
      "__v": 0
  },
  {
      "_id": "651572b5a574bce348fea71a",
      "printer_id": "65082196ef2033988448587d",
      "address": "8.8.4.4",
      "time": {
          "year": "2023",
          "month": "ספטמבר",
          "day": "28",
          "weekday": "חמישי",
          "hours": 15,
          "minutes": 33
      },
      "online": 1,
      "date": "2023-09-28T12:33:57.062Z",
      "__v": 0
  },
  {
      "_id": "651572d3a574bce348fea75b",
      "printer_id": "65082196ef2033988448587d",
      "address": "8.8.4.4",
      "time": {
          "year": "2023",
          "month": "ספטמבר",
          "day": "28",
          "weekday": "חמישי",
          "hours": 15,
          "minutes": 34
      },
      "online": 1,
      "date": "2023-09-28T12:34:27.051Z",
      "__v": 0
  },
  {
      "_id": "651572f1a574bce348fea79c",
      "printer_id": "65082196ef2033988448587d",
      "address": "8.8.4.4",
      "time": {
          "year": "2023",
          "month": "ספטמבר",
          "day": "28",
          "weekday": "חמישי",
          "hours": 15,
          "minutes": 34
      },
      "online": 1,
      "date": "2023-09-28T12:34:57.059Z",
      "__v": 0
  },
  {
      "_id": "6515730fa574bce348fea7dd",
      "printer_id": "65082196ef2033988448587d",
      "address": "8.8.4.4",
      "time": {
          "year": "2023",
          "month": "ספטמבר",
          "day": "28",
          "weekday": "חמישי",
          "hours": 15,
          "minutes": 35
      },
      "online": 1,
      "date": "2023-09-28T12:35:27.048Z",
      "__v": 0
  },
  {
      "_id": "6515732da574bce348fea81e",
      "printer_id": "65082196ef2033988448587d",
      "address": "8.8.4.4",
      "time": {
          "year": "2023",
          "month": "ספטמבר",
          "day": "28",
          "weekday": "חמישי",
          "hours": 15,
          "minutes": 35
      },
      "online": 1,
      "date": "2023-09-28T12:35:57.050Z",
      "__v": 0
  },
  {
      "_id": "6515790a32dbc8a795384a29",
      "printer_id": "65082196ef2033988448587d",
      "address": "8.8.4.4",
      "time": {
          "year": "2023",
          "month": "ספטמבר",
          "day": "28",
          "weekday": "חמישי",
          "hours": 16,
          "minutes": 0
      },
      "online": 1,
      "date": "2023-09-28T13:00:58.563Z",
      "__v": 0
  },
  {
      "_id": "651579c8823022956684bbfb",
      "printer_id": "65082196ef2033988448587d",
      "address": "8.8.4.4",
      "time": {
          "year": "2023",
          "month": "ספטמבר",
          "day": "28",
          "weekday": "חמישי",
          "hours": 16,
          "minutes": 4
      },
      "online": 1,
      "date": "2023-09-28T13:04:08.559Z",
      "__v": 0
  },
  {
      "_id": "651579e6823022956684bc3c",
      "printer_id": "65082196ef2033988448587d",
      "address": "8.8.4.4",
      "time": {
          "year": "2023",
          "month": "ספטמבר",
          "day": "28",
          "weekday": "חמישי",
          "hours": 16,
          "minutes": 4
      },
      "online": 1,
      "date": "2023-09-28T13:04:38.554Z",
      "__v": 0
  },
  {
      "_id": "65157a04823022956684bc7d",
      "printer_id": "65082196ef2033988448587d",
      "address": "8.8.4.4",
      "time": {
          "year": "2023",
          "month": "ספטמבר",
          "day": "28",
          "weekday": "חמישי",
          "hours": 16,
          "minutes": 5
      },
      "online": 1,
      "date": "2023-09-28T13:05:08.560Z",
      "__v": 0
  },
  {
      "_id": "65157a22823022956684bcbe",
      "printer_id": "65082196ef2033988448587d",
      "address": "8.8.4.4",
      "time": {
          "year": "2023",
          "month": "ספטמבר",
          "day": "28",
          "weekday": "חמישי",
          "hours": 16,
          "minutes": 5
      },
      "online": 1,
      "date": "2023-09-28T13:05:38.557Z",
      "__v": 0
  },
  {
      "_id": "65157a40823022956684bcff",
      "printer_id": "65082196ef2033988448587d",
      "address": "8.8.4.4",
      "time": {
          "year": "2023",
          "month": "ספטמבר",
          "day": "28",
          "weekday": "חמישי",
          "hours": 16,
          "minutes": 6
      },
      "online": 1,
      "date": "2023-09-28T13:06:08.558Z",
      "__v": 0
  },
  {
      "_id": "65157a5e823022956684bd40",
      "printer_id": "65082196ef2033988448587d",
      "address": "8.8.4.4",
      "time": {
          "year": "2023",
          "month": "ספטמבר",
          "day": "28",
          "weekday": "חמישי",
          "hours": 16,
          "minutes": 6
      },
      "online": 1,
      "date": "2023-09-28T13:06:38.561Z",
      "__v": 0
  },
  {
      "_id": "65157a7c823022956684bd81",
      "printer_id": "65082196ef2033988448587d",
      "address": "8.8.4.4",
      "time": {
          "year": "2023",
          "month": "ספטמבר",
          "day": "28",
          "weekday": "חמישי",
          "hours": 16,
          "minutes": 7
      },
      "online": 1,
      "date": "2023-09-28T13:07:08.549Z",
      "__v": 0
  },
  {
      "_id": "65157a9a823022956684bdc2",
      "printer_id": "65082196ef2033988448587d",
      "address": "8.8.4.4",
      "time": {
          "year": "2023",
          "month": "ספטמבר",
          "day": "28",
          "weekday": "חמישי",
          "hours": 16,
          "minutes": 7
      },
      "online": 1,
      "date": "2023-09-28T13:07:38.562Z",
      "__v": 0
  },
  {
      "_id": "65157ab8823022956684be03",
      "printer_id": "65082196ef2033988448587d",
      "address": "8.8.4.4",
      "time": {
          "year": "2023",
          "month": "ספטמבר",
          "day": "28",
          "weekday": "חמישי",
          "hours": 16,
          "minutes": 8
      },
      "online": 1,
      "date": "2023-09-28T13:08:08.555Z",
      "__v": 0
  },
  {
      "_id": "65157ad6823022956684be44",
      "printer_id": "65082196ef2033988448587d",
      "address": "8.8.4.4",
      "time": {
          "year": "2023",
          "month": "ספטמבר",
          "day": "28",
          "weekday": "חמישי",
          "hours": 16,
          "minutes": 8
      },
      "online": 1,
      "date": "2023-09-28T13:08:38.555Z",
      "__v": 0
  },
  {
      "_id": "65157af4823022956684be85",
      "printer_id": "65082196ef2033988448587d",
      "address": "8.8.4.4",
      "time": {
          "year": "2023",
          "month": "ספטמבר",
          "day": "28",
          "weekday": "חמישי",
          "hours": 16,
          "minutes": 9
      },
      "online": 1,
      "date": "2023-09-28T13:09:08.549Z",
      "__v": 0
  },
  {
      "_id": "65157b13823022956684bec6",
      "printer_id": "65082196ef2033988448587d",
      "address": "8.8.4.4",
      "time": {
          "year": "2023",
          "month": "ספטמבר",
          "day": "28",
          "weekday": "חמישי",
          "hours": 16,
          "minutes": 9
      },
      "online": 1,
      "date": "2023-09-28T13:09:39.552Z",
      "__v": 0
  },
  {
      "_id": "65157b30823022956684bf07",
      "printer_id": "65082196ef2033988448587d",
      "address": "8.8.4.4",
      "time": {
          "year": "2023",
          "month": "ספטמבר",
          "day": "28",
          "weekday": "חמישי",
          "hours": 16,
          "minutes": 10
      },
      "online": 1,
      "date": "2023-09-28T13:10:08.552Z",
      "__v": 0
  },
  {
      "_id": "65157b4e823022956684bf48",
      "printer_id": "65082196ef2033988448587d",
      "address": "8.8.4.4",
      "time": {
          "year": "2023",
          "month": "ספטמבר",
          "day": "28",
          "weekday": "חמישי",
          "hours": 16,
          "minutes": 10
      },
      "online": 1,
      "date": "2023-09-28T13:10:38.557Z",
      "__v": 0
  },
  {
      "_id": "65157b6c823022956684bf8e",
      "printer_id": "65082196ef2033988448587d",
      "address": "8.8.4.4",
      "time": {
          "year": "2023",
          "month": "ספטמבר",
          "day": "28",
          "weekday": "חמישי",
          "hours": 16,
          "minutes": 11
      },
      "online": 1,
      "date": "2023-09-28T13:11:08.553Z",
      "__v": 0
  },
  {
      "_id": "65157b8a823022956684bfd0",
      "printer_id": "65082196ef2033988448587d",
      "address": "8.8.4.4",
      "time": {
          "year": "2023",
          "month": "ספטמבר",
          "day": "28",
          "weekday": "חמישי",
          "hours": 16,
          "minutes": 11
      },
      "online": 1,
      "date": "2023-09-28T13:11:38.550Z",
      "__v": 0
  },
  {
      "_id": "65157ba8823022956684c011",
      "printer_id": "65082196ef2033988448587d",
      "address": "8.8.4.4",
      "time": {
          "year": "2023",
          "month": "ספטמבר",
          "day": "28",
          "weekday": "חמישי",
          "hours": 16,
          "minutes": 12
      },
      "online": 1,
      "date": "2023-09-28T13:12:08.556Z",
      "__v": 0
  },
  {
      "_id": "65157bc6823022956684c052",
      "printer_id": "65082196ef2033988448587d",
      "address": "8.8.4.4",
      "time": {
          "year": "2023",
          "month": "ספטמבר",
          "day": "28",
          "weekday": "חמישי",
          "hours": 16,
          "minutes": 12
      },
      "online": 1,
      "date": "2023-09-28T13:12:38.549Z",
      "__v": 0
  },
  {
      "_id": "65157be4823022956684c093",
      "printer_id": "65082196ef2033988448587d",
      "address": "8.8.4.4",
      "time": {
          "year": "2023",
          "month": "ספטמבר",
          "day": "28",
          "weekday": "חמישי",
          "hours": 16,
          "minutes": 13
      },
      "online": 1,
      "date": "2023-09-28T13:13:08.549Z",
      "__v": 0
  },
  {
      "_id": "65157c02823022956684c0d4",
      "printer_id": "65082196ef2033988448587d",
      "address": "8.8.4.4",
      "time": {
          "year": "2023",
          "month": "ספטמבר",
          "day": "28",
          "weekday": "חמישי",
          "hours": 16,
          "minutes": 13
      },
      "online": 1,
      "date": "2023-09-28T13:13:38.560Z",
      "__v": 0
  },
  {
      "_id": "65157c20823022956684c117",
      "printer_id": "65082196ef2033988448587d",
      "address": "8.8.4.4",
      "time": {
          "year": "2023",
          "month": "ספטמבר",
          "day": "28",
          "weekday": "חמישי",
          "hours": 16,
          "minutes": 14
      },
      "online": 1,
      "date": "2023-09-28T13:14:08.563Z",
      "__v": 0
  },
  {
      "_id": "65157c3e823022956684c158",
      "printer_id": "65082196ef2033988448587d",
      "address": "8.8.4.4",
      "time": {
          "year": "2023",
          "month": "ספטמבר",
          "day": "28",
          "weekday": "חמישי",
          "hours": 16,
          "minutes": 14
      },
      "online": 1,
      "date": "2023-09-28T13:14:38.553Z",
      "__v": 0
  },
  {
      "_id": "65157c5c823022956684c19a",
      "printer_id": "65082196ef2033988448587d",
      "address": "8.8.4.4",
      "time": {
          "year": "2023",
          "month": "ספטמבר",
          "day": "28",
          "weekday": "חמישי",
          "hours": 16,
          "minutes": 15
      },
      "online": 1,
      "date": "2023-09-28T13:15:08.555Z",
      "__v": 0
  },
  {
      "_id": "65157c7a823022956684c1db",
      "printer_id": "65082196ef2033988448587d",
      "address": "8.8.4.4",
      "time": {
          "year": "2023",
          "month": "ספטמבר",
          "day": "28",
          "weekday": "חמישי",
          "hours": 16,
          "minutes": 15
      },
      "online": 1,
      "date": "2023-09-28T13:15:38.556Z",
      "__v": 0
  },
  {
      "_id": "65157c98823022956684c21c",
      "printer_id": "65082196ef2033988448587d",
      "address": "8.8.4.4",
      "time": {
          "year": "2023",
          "month": "ספטמבר",
          "day": "28",
          "weekday": "חמישי",
          "hours": 16,
          "minutes": 16
      },
      "online": 1,
      "date": "2023-09-28T13:16:08.549Z",
      "__v": 0
  },
  {
      "_id": "65157cb6823022956684c25d",
      "printer_id": "65082196ef2033988448587d",
      "address": "8.8.4.4",
      "time": {
          "year": "2023",
          "month": "ספטמבר",
          "day": "28",
          "weekday": "חמישי",
          "hours": 16,
          "minutes": 16
      },
      "online": 1,
      "date": "2023-09-28T13:16:38.548Z",
      "__v": 0
  },
  {
      "_id": "65157cd4823022956684c29e",
      "printer_id": "65082196ef2033988448587d",
      "address": "8.8.4.4",
      "time": {
          "year": "2023",
          "month": "ספטמבר",
          "day": "28",
          "weekday": "חמישי",
          "hours": 16,
          "minutes": 17
      },
      "online": 1,
      "date": "2023-09-28T13:17:08.547Z",
      "__v": 0
  },
  {
      "_id": "65157cf2823022956684c2df",
      "printer_id": "65082196ef2033988448587d",
      "address": "8.8.4.4",
      "time": {
          "year": "2023",
          "month": "ספטמבר",
          "day": "28",
          "weekday": "חמישי",
          "hours": 16,
          "minutes": 17
      },
      "online": 1,
      "date": "2023-09-28T13:17:38.559Z",
      "__v": 0
  },
  {
      "_id": "65157d10823022956684c321",
      "printer_id": "65082196ef2033988448587d",
      "address": "8.8.4.4",
      "time": {
          "year": "2023",
          "month": "ספטמבר",
          "day": "28",
          "weekday": "חמישי",
          "hours": 16,
          "minutes": 18
      },
      "online": 1,
      "date": "2023-09-28T13:18:08.547Z",
      "__v": 0
  },
  {
      "_id": "65157d2e823022956684c362",
      "printer_id": "65082196ef2033988448587d",
      "address": "8.8.4.4",
      "time": {
          "year": "2023",
          "month": "ספטמבר",
          "day": "28",
          "weekday": "חמישי",
          "hours": 16,
          "minutes": 18
      },
      "online": 1,
      "date": "2023-09-28T13:18:38.561Z",
      "__v": 0
  },
  {
      "_id": "65157d4c823022956684c3a4",
      "printer_id": "65082196ef2033988448587d",
      "address": "8.8.4.4",
      "time": {
          "year": "2023",
          "month": "ספטמבר",
          "day": "28",
          "weekday": "חמישי",
          "hours": 16,
          "minutes": 19
      },
      "online": 1,
      "date": "2023-09-28T13:19:08.562Z",
      "__v": 0
  },
  {
      "_id": "65157d6a823022956684c3e6",
      "printer_id": "65082196ef2033988448587d",
      "address": "8.8.4.4",
      "time": {
          "year": "2023",
          "month": "ספטמבר",
          "day": "28",
          "weekday": "חמישי",
          "hours": 16,
          "minutes": 19
      },
      "online": 1,
      "date": "2023-09-28T13:19:38.551Z",
      "__v": 0
  },
  {
      "_id": "65157d89823022956684c427",
      "printer_id": "65082196ef2033988448587d",
      "address": "8.8.4.4",
      "time": {
          "year": "2023",
          "month": "ספטמבר",
          "day": "28",
          "weekday": "חמישי",
          "hours": 16,
          "minutes": 20
      },
      "online": 1,
      "date": "2023-09-28T13:20:09.073Z",
      "__v": 0
  },
  {
      "_id": "65157da6823022956684c468",
      "printer_id": "65082196ef2033988448587d",
      "address": "8.8.4.4",
      "time": {
          "year": "2023",
          "month": "ספטמבר",
          "day": "28",
          "weekday": "חמישי",
          "hours": 16,
          "minutes": 20
      },
      "online": 1,
      "date": "2023-09-28T13:20:38.554Z",
      "__v": 0
  },
  {
      "_id": "65157dc5823022956684c4a9",
      "printer_id": "65082196ef2033988448587d",
      "address": "8.8.4.4",
      "time": {
          "year": "2023",
          "month": "ספטמבר",
          "day": "28",
          "weekday": "חמישי",
          "hours": 16,
          "minutes": 21
      },
      "online": 0,
      "date": "2023-09-28T13:21:09.052Z",
      "__v": 0
  },
  {
      "_id": "65157de3823022956684c4ea",
      "printer_id": "65082196ef2033988448587d",
      "address": "8.8.4.4",
      "time": {
          "year": "2023",
          "month": "ספטמבר",
          "day": "28",
          "weekday": "חמישי",
          "hours": 16,
          "minutes": 21
      },
      "online": 1,
      "date": "2023-09-28T13:21:39.053Z",
      "__v": 0
  },
  {
      "_id": "65157e00823022956684c52b",
      "printer_id": "65082196ef2033988448587d",
      "address": "8.8.4.4",
      "time": {
          "year": "2023",
          "month": "ספטמבר",
          "day": "28",
          "weekday": "חמישי",
          "hours": 16,
          "minutes": 22
      },
      "online": 0,
      "date": "2023-09-28T13:22:08.558Z",
      "__v": 0
  },
  {
      "_id": "65157e1f823022956684c56c",
      "printer_id": "65082196ef2033988448587d",
      "address": "8.8.4.4",
      "time": {
          "year": "2023",
          "month": "ספטמבר",
          "day": "28",
          "weekday": "חמישי",
          "hours": 16,
          "minutes": 22
      },
      "online": 0,
      "date": "2023-09-28T13:22:39.057Z",
      "__v": 0
  },
  {
      "_id": "65157e3d823022956684c5ad",
      "printer_id": "65082196ef2033988448587d",
      "address": "8.8.4.4",
      "time": {
          "year": "2023",
          "month": "ספטמבר",
          "day": "28",
          "weekday": "חמישי",
          "hours": 16,
          "minutes": 23
      },
      "online": 1,
      "date": "2023-09-28T13:23:09.053Z",
      "__v": 0
  },
  {
      "_id": "65157e5b823022956684c5ef",
      "printer_id": "65082196ef2033988448587d",
      "address": "8.8.4.4",
      "time": {
          "year": "2023",
          "month": "ספטמבר",
          "day": "28",
          "weekday": "חמישי",
          "hours": 16,
          "minutes": 23
      },
      "online": 1,
      "date": "2023-09-28T13:23:39.056Z",
      "__v": 0
  },
  {
      "_id": "65157e79823022956684c630",
      "printer_id": "65082196ef2033988448587d",
      "address": "8.8.4.4",
      "time": {
          "year": "2023",
          "month": "ספטמבר",
          "day": "28",
          "weekday": "חמישי",
          "hours": 16,
          "minutes": 24
      },
      "online": 1,
      "date": "2023-09-28T13:24:09.057Z",
      "__v": 0
  },
  {
      "_id": "65157e97823022956684c671",
      "printer_id": "65082196ef2033988448587d",
      "address": "8.8.4.4",
      "time": {
          "year": "2023",
          "month": "ספטמבר",
          "day": "28",
          "weekday": "חמישי",
          "hours": 16,
          "minutes": 24
      },
      "online": 1,
      "date": "2023-09-28T13:24:39.052Z",
      "__v": 0
  },
  {
      "_id": "65157eb5823022956684c6b2",
      "printer_id": "65082196ef2033988448587d",
      "address": "8.8.4.4",
      "time": {
          "year": "2023",
          "month": "ספטמבר",
          "day": "28",
          "weekday": "חמישי",
          "hours": 16,
          "minutes": 25
      },
      "online": 1,
      "date": "2023-09-28T13:25:09.061Z",
      "__v": 0
  },
  {
      "_id": "65157ed3823022956684c6f4",
      "printer_id": "65082196ef2033988448587d",
      "address": "8.8.4.4",
      "time": {
          "year": "2023",
          "month": "ספטמבר",
          "day": "28",
          "weekday": "חמישי",
          "hours": 16,
          "minutes": 25
      },
      "online": 1,
      "date": "2023-09-28T13:25:39.064Z",
      "__v": 0
  },
  {
      "_id": "65157ef1823022956684c736",
      "printer_id": "65082196ef2033988448587d",
      "address": "8.8.4.4",
      "time": {
          "year": "2023",
          "month": "ספטמבר",
          "day": "28",
          "weekday": "חמישי",
          "hours": 16,
          "minutes": 26
      },
      "online": 1,
      "date": "2023-09-28T13:26:09.056Z",
      "__v": 0
  },
  {
      "_id": "65157f0f823022956684c777",
      "printer_id": "65082196ef2033988448587d",
      "address": "8.8.4.4",
      "time": {
          "year": "2023",
          "month": "ספטמבר",
          "day": "28",
          "weekday": "חמישי",
          "hours": 16,
          "minutes": 26
      },
      "online": 1,
      "date": "2023-09-28T13:26:39.062Z",
      "__v": 0
  },
  {
      "_id": "65157f2d823022956684c7b9",
      "printer_id": "65082196ef2033988448587d",
      "address": "8.8.4.4",
      "time": {
          "year": "2023",
          "month": "ספטמבר",
          "day": "28",
          "weekday": "חמישי",
          "hours": 16,
          "minutes": 27
      },
      "online": 1,
      "date": "2023-09-28T13:27:09.550Z",
      "__v": 0
  },
  {
      "_id": "65157f4b823022956684c7fa",
      "printer_id": "65082196ef2033988448587d",
      "address": "8.8.4.4",
      "time": {
          "year": "2023",
          "month": "ספטמבר",
          "day": "28",
          "weekday": "חמישי",
          "hours": 16,
          "minutes": 27
      },
      "online": 1,
      "date": "2023-09-28T13:27:39.056Z",
      "__v": 0
  },
  {
      "_id": "65157f69823022956684c83b",
      "printer_id": "65082196ef2033988448587d",
      "address": "8.8.4.4",
      "time": {
          "year": "2023",
          "month": "ספטמבר",
          "day": "28",
          "weekday": "חמישי",
          "hours": 16,
          "minutes": 28
      },
      "online": 1,
      "date": "2023-09-28T13:28:09.048Z",
      "__v": 0
  },
  {
      "_id": "65157f87823022956684c87c",
      "printer_id": "65082196ef2033988448587d",
      "address": "8.8.4.4",
      "time": {
          "year": "2023",
          "month": "ספטמבר",
          "day": "28",
          "weekday": "חמישי",
          "hours": 16,
          "minutes": 28
      },
      "online": 1,
      "date": "2023-09-28T13:28:39.064Z",
      "__v": 0
  },
  {
      "_id": "65157fa5823022956684c8bd",
      "printer_id": "65082196ef2033988448587d",
      "address": "8.8.4.4",
      "time": {
          "year": "2023",
          "month": "ספטמבר",
          "day": "28",
          "weekday": "חמישי",
          "hours": 16,
          "minutes": 29
      },
      "online": 1,
      "date": "2023-09-28T13:29:09.055Z",
      "__v": 0
  },
  {
      "_id": "65157fc3823022956684c8ff",
      "printer_id": "65082196ef2033988448587d",
      "address": "8.8.4.4",
      "time": {
          "year": "2023",
          "month": "ספטמבר",
          "day": "28",
          "weekday": "חמישי",
          "hours": 16,
          "minutes": 29
      },
      "online": 1,
      "date": "2023-09-28T13:29:39.059Z",
      "__v": 0
  },
  {
      "_id": "65157fe1823022956684c940",
      "printer_id": "65082196ef2033988448587d",
      "address": "8.8.4.4",
      "time": {
          "year": "2023",
          "month": "ספטמבר",
          "day": "28",
          "weekday": "חמישי",
          "hours": 16,
          "minutes": 30
      },
      "online": 1,
      "date": "2023-09-28T13:30:09.047Z",
      "__v": 0
  },
  {
      "_id": "65157fff823022956684c982",
      "printer_id": "65082196ef2033988448587d",
      "address": "8.8.4.4",
      "time": {
          "year": "2023",
          "month": "ספטמבר",
          "day": "28",
          "weekday": "חמישי",
          "hours": 16,
          "minutes": 30
      },
      "online": 1,
      "date": "2023-09-28T13:30:39.060Z",
      "__v": 0
  },
  {
      "_id": "6515801d823022956684c9c3",
      "printer_id": "65082196ef2033988448587d",
      "address": "8.8.4.4",
      "time": {
          "year": "2023",
          "month": "ספטמבר",
          "day": "28",
          "weekday": "חמישי",
          "hours": 16,
          "minutes": 31
      },
      "online": 1,
      "date": "2023-09-28T13:31:09.056Z",
      "__v": 0
  },
  {
      "_id": "6515803b823022956684ca04",
      "printer_id": "65082196ef2033988448587d",
      "address": "8.8.4.4",
      "time": {
          "year": "2023",
          "month": "ספטמבר",
          "day": "28",
          "weekday": "חמישי",
          "hours": 16,
          "minutes": 31
      },
      "online": 1,
      "date": "2023-09-28T13:31:39.060Z",
      "__v": 0
  },
  {
      "_id": "6518775bdaa1bddb2291b382",
      "printer_id": "65082196ef2033988448587d",
      "address": "8.8.4.4",
      "time": {
          "year": "2023",
          "month": "ספטמבר",
          "day": "30",
          "weekday": "שבת",
          "hours": 22,
          "minutes": 30
      },
      "online": 1,
      "date": "2023-09-30T19:30:35.068Z",
      "__v": 0
  },
  {
      "_id": "65187779daa1bddb2291b3c3",
      "printer_id": "65082196ef2033988448587d",
      "address": "8.8.4.4",
      "time": {
          "year": "2023",
          "month": "ספטמבר",
          "day": "30",
          "weekday": "שבת",
          "hours": 22,
          "minutes": 31
      },
      "online": 1,
      "date": "2023-09-30T19:31:05.062Z",
      "__v": 0
  },
  {
      "_id": "65187797daa1bddb2291b404",
      "printer_id": "65082196ef2033988448587d",
      "address": "8.8.4.4",
      "time": {
          "year": "2023",
          "month": "ספטמבר",
          "day": "30",
          "weekday": "שבת",
          "hours": 22,
          "minutes": 31
      },
      "online": 1,
      "date": "2023-09-30T19:31:35.059Z",
      "__v": 0
  },
  {
      "_id": "651877b5daa1bddb2291b445",
      "printer_id": "65082196ef2033988448587d",
      "address": "8.8.4.4",
      "time": {
          "year": "2023",
          "month": "ספטמבר",
          "day": "30",
          "weekday": "שבת",
          "hours": 22,
          "minutes": 32
      },
      "online": 1,
      "date": "2023-09-30T19:32:05.063Z",
      "__v": 0
  },
  {
      "_id": "651877d3daa1bddb2291b486",
      "printer_id": "65082196ef2033988448587d",
      "address": "8.8.4.4",
      "time": {
          "year": "2023",
          "month": "ספטמבר",
          "day": "30",
          "weekday": "שבת",
          "hours": 22,
          "minutes": 32
      },
      "online": 1,
      "date": "2023-09-30T19:32:35.063Z",
      "__v": 0
  },
  {
      "_id": "651877f1daa1bddb2291b4c7",
      "printer_id": "65082196ef2033988448587d",
      "address": "8.8.4.4",
      "time": {
          "year": "2023",
          "month": "ספטמבר",
          "day": "30",
          "weekday": "שבת",
          "hours": 22,
          "minutes": 33
      },
      "online": 1,
      "date": "2023-09-30T19:33:05.057Z",
      "__v": 0
  },
  {
      "_id": "6518780fdaa1bddb2291b508",
      "printer_id": "65082196ef2033988448587d",
      "address": "8.8.4.4",
      "time": {
          "year": "2023",
          "month": "ספטמבר",
          "day": "30",
          "weekday": "שבת",
          "hours": 22,
          "minutes": 33
      },
      "online": 1,
      "date": "2023-09-30T19:33:35.057Z",
      "__v": 0
  },
  {
      "_id": "6518782ddaa1bddb2291b549",
      "printer_id": "65082196ef2033988448587d",
      "address": "8.8.4.4",
      "time": {
          "year": "2023",
          "month": "ספטמבר",
          "day": "30",
          "weekday": "שבת",
          "hours": 22,
          "minutes": 34
      },
      "online": 1,
      "date": "2023-09-30T19:34:05.055Z",
      "__v": 0
  },
  {
      "_id": "6518784bdaa1bddb2291b58a",
      "printer_id": "65082196ef2033988448587d",
      "address": "8.8.4.4",
      "time": {
          "year": "2023",
          "month": "ספטמבר",
          "day": "30",
          "weekday": "שבת",
          "hours": 22,
          "minutes": 34
      },
      "online": 1,
      "date": "2023-09-30T19:34:35.064Z",
      "__v": 0
  },
  {
      "_id": "65187869daa1bddb2291b5cb",
      "printer_id": "65082196ef2033988448587d",
      "address": "8.8.4.4",
      "time": {
          "year": "2023",
          "month": "ספטמבר",
          "day": "30",
          "weekday": "שבת",
          "hours": 22,
          "minutes": 35
      },
      "online": 1,
      "date": "2023-09-30T19:35:05.056Z",
      "__v": 0
  },
  {
      "_id": "65187887daa1bddb2291b60c",
      "printer_id": "65082196ef2033988448587d",
      "address": "8.8.4.4",
      "time": {
          "year": "2023",
          "month": "ספטמבר",
          "day": "30",
          "weekday": "שבת",
          "hours": 22,
          "minutes": 35
      },
      "online": 1,
      "date": "2023-09-30T19:35:35.058Z",
      "__v": 0
  },
  {
      "_id": "651878a5daa1bddb2291b64d",
      "printer_id": "65082196ef2033988448587d",
      "address": "8.8.4.4",
      "time": {
          "year": "2023",
          "month": "ספטמבר",
          "day": "30",
          "weekday": "שבת",
          "hours": 22,
          "minutes": 36
      },
      "online": 1,
      "date": "2023-09-30T19:36:05.069Z",
      "__v": 0
  },
  {
      "_id": "651878c3daa1bddb2291b68e",
      "printer_id": "65082196ef2033988448587d",
      "address": "8.8.4.4",
      "time": {
          "year": "2023",
          "month": "ספטמבר",
          "day": "30",
          "weekday": "שבת",
          "hours": 22,
          "minutes": 36
      },
      "online": 1,
      "date": "2023-09-30T19:36:35.063Z",
      "__v": 0
  },
  {
      "_id": "651878e1daa1bddb2291b6cf",
      "printer_id": "65082196ef2033988448587d",
      "address": "8.8.4.4",
      "time": {
          "year": "2023",
          "month": "ספטמבר",
          "day": "30",
          "weekday": "שבת",
          "hours": 22,
          "minutes": 37
      },
      "online": 1,
      "date": "2023-09-30T19:37:05.059Z",
      "__v": 0
  },
  {
      "_id": "651878ffdaa1bddb2291b710",
      "printer_id": "65082196ef2033988448587d",
      "address": "8.8.4.4",
      "time": {
          "year": "2023",
          "month": "ספטמבר",
          "day": "30",
          "weekday": "שבת",
          "hours": 22,
          "minutes": 37
      },
      "online": 1,
      "date": "2023-09-30T19:37:35.061Z",
      "__v": 0
  },
  {
      "_id": "6518791ddaa1bddb2291b751",
      "printer_id": "65082196ef2033988448587d",
      "address": "8.8.4.4",
      "time": {
          "year": "2023",
          "month": "ספטמבר",
          "day": "30",
          "weekday": "שבת",
          "hours": 22,
          "minutes": 38
      },
      "online": 1,
      "date": "2023-09-30T19:38:05.056Z",
      "__v": 0
  },
  {
      "_id": "6518793bdaa1bddb2291b792",
      "printer_id": "65082196ef2033988448587d",
      "address": "8.8.4.4",
      "time": {
          "year": "2023",
          "month": "ספטמבר",
          "day": "30",
          "weekday": "שבת",
          "hours": 22,
          "minutes": 38
      },
      "online": 1,
      "date": "2023-09-30T19:38:35.058Z",
      "__v": 0
  },
  {
      "_id": "65187959daa1bddb2291b7d3",
      "printer_id": "65082196ef2033988448587d",
      "address": "8.8.4.4",
      "time": {
          "year": "2023",
          "month": "ספטמבר",
          "day": "30",
          "weekday": "שבת",
          "hours": 22,
          "minutes": 39
      },
      "online": 1,
      "date": "2023-09-30T19:39:05.066Z",
      "__v": 0
  },
  {
      "_id": "651879998bf35b5b36a44153",
      "printer_id": "65082196ef2033988448587d",
      "address": "8.8.4.4",
      "time": {
          "year": "2023",
          "month": "ספטמבר",
          "day": "30",
          "weekday": "שבת",
          "hours": 22,
          "minutes": 40
      },
      "online": 1,
      "date": "2023-09-30T19:40:09.289Z",
      "__v": 0
  },
  {
      "_id": "651879b78bf35b5b36a44194",
      "printer_id": "65082196ef2033988448587d",
      "address": "8.8.4.4",
      "time": {
          "year": "2023",
          "month": "ספטמבר",
          "day": "30",
          "weekday": "שבת",
          "hours": 22,
          "minutes": 40
      },
      "online": 1,
      "date": "2023-09-30T19:40:39.555Z",
      "__v": 0
  },
  {
      "_id": "651879d58bf35b5b36a441d5",
      "printer_id": "65082196ef2033988448587d",
      "address": "8.8.4.4",
      "time": {
          "year": "2023",
          "month": "ספטמבר",
          "day": "30",
          "weekday": "שבת",
          "hours": 22,
          "minutes": 41
      },
      "online": 1,
      "date": "2023-09-30T19:41:09.560Z",
      "__v": 0
  },
  {
      "_id": "651879f48bf35b5b36a44216",
      "printer_id": "65082196ef2033988448587d",
      "address": "8.8.4.4",
      "time": {
          "year": "2023",
          "month": "ספטמבר",
          "day": "30",
          "weekday": "שבת",
          "hours": 22,
          "minutes": 41
      },
      "online": 0,
      "date": "2023-09-30T19:41:40.059Z",
      "__v": 0
  },
  {
      "_id": "65187a118bf35b5b36a44257",
      "printer_id": "65082196ef2033988448587d",
      "address": "8.8.4.4",
      "time": {
          "year": "2023",
          "month": "ספטמבר",
          "day": "30",
          "weekday": "שבת",
          "hours": 22,
          "minutes": 42
      },
      "online": 1,
      "date": "2023-09-30T19:42:09.560Z",
      "__v": 0
  },
  {
      "_id": "65187a308bf35b5b36a44298",
      "printer_id": "65082196ef2033988448587d",
      "address": "8.8.4.4",
      "time": {
          "year": "2023",
          "month": "ספטמבר",
          "day": "30",
          "weekday": "שבת",
          "hours": 22,
          "minutes": 42
      },
      "online": 1,
      "date": "2023-09-30T19:42:40.056Z",
      "__v": 0
  },
  {
      "_id": "65187a4d8bf35b5b36a442d9",
      "printer_id": "65082196ef2033988448587d",
      "address": "8.8.4.4",
      "time": {
          "year": "2023",
          "month": "ספטמבר",
          "day": "30",
          "weekday": "שבת",
          "hours": 22,
          "minutes": 43
      },
      "online": 1,
      "date": "2023-09-30T19:43:09.555Z",
      "__v": 0
  },
  {
      "_id": "65187a6b8bf35b5b36a4431a",
      "printer_id": "65082196ef2033988448587d",
      "address": "8.8.4.4",
      "time": {
          "year": "2023",
          "month": "ספטמבר",
          "day": "30",
          "weekday": "שבת",
          "hours": 22,
          "minutes": 43
      },
      "online": 1,
      "date": "2023-09-30T19:43:39.560Z",
      "__v": 0
  },
  {
      "_id": "65187a898bf35b5b36a4435b",
      "printer_id": "65082196ef2033988448587d",
      "address": "8.8.4.4",
      "time": {
          "year": "2023",
          "month": "ספטמבר",
          "day": "30",
          "weekday": "שבת",
          "hours": 22,
          "minutes": 44
      },
      "online": 1,
      "date": "2023-09-30T19:44:09.563Z",
      "__v": 0
  },
  {
      "_id": "65187aa78bf35b5b36a4439c",
      "printer_id": "65082196ef2033988448587d",
      "address": "8.8.4.4",
      "time": {
          "year": "2023",
          "month": "ספטמבר",
          "day": "30",
          "weekday": "שבת",
          "hours": 22,
          "minutes": 44
      },
      "online": 1,
      "date": "2023-09-30T19:44:39.555Z",
      "__v": 0
  },
  {
      "_id": "65187ac58bf35b5b36a443dd",
      "printer_id": "65082196ef2033988448587d",
      "address": "8.8.4.4",
      "time": {
          "year": "2023",
          "month": "ספטמבר",
          "day": "30",
          "weekday": "שבת",
          "hours": 22,
          "minutes": 45
      },
      "online": 1,
      "date": "2023-09-30T19:45:09.567Z",
      "__v": 0
  },
  {
      "_id": "65187ae38bf35b5b36a4441e",
      "printer_id": "65082196ef2033988448587d",
      "address": "8.8.4.4",
      "time": {
          "year": "2023",
          "month": "ספטמבר",
          "day": "30",
          "weekday": "שבת",
          "hours": 22,
          "minutes": 45
      },
      "online": 1,
      "date": "2023-09-30T19:45:39.563Z",
      "__v": 0
  },
  {
      "_id": "65187b018bf35b5b36a4445f",
      "printer_id": "65082196ef2033988448587d",
      "address": "8.8.4.4",
      "time": {
          "year": "2023",
          "month": "ספטמבר",
          "day": "30",
          "weekday": "שבת",
          "hours": 22,
          "minutes": 46
      },
      "online": 1,
      "date": "2023-09-30T19:46:09.554Z",
      "__v": 0
  },
  {
      "_id": "65187b1f8bf35b5b36a444a0",
      "printer_id": "65082196ef2033988448587d",
      "address": "8.8.4.4",
      "time": {
          "year": "2023",
          "month": "ספטמבר",
          "day": "30",
          "weekday": "שבת",
          "hours": 22,
          "minutes": 46
      },
      "online": 1,
      "date": "2023-09-30T19:46:39.562Z",
      "__v": 0
  },
  {
      "_id": "65187b3e8bf35b5b36a444e1",
      "printer_id": "65082196ef2033988448587d",
      "address": "8.8.4.4",
      "time": {
          "year": "2023",
          "month": "ספטמבר",
          "day": "30",
          "weekday": "שבת",
          "hours": 22,
          "minutes": 47
      },
      "online": 1,
      "date": "2023-09-30T19:47:10.060Z",
      "__v": 0
  },
  {
      "_id": "65187b5b8bf35b5b36a44522",
      "printer_id": "65082196ef2033988448587d",
      "address": "8.8.4.4",
      "time": {
          "year": "2023",
          "month": "ספטמבר",
          "day": "30",
          "weekday": "שבת",
          "hours": 22,
          "minutes": 47
      },
      "online": 1,
      "date": "2023-09-30T19:47:39.555Z",
      "__v": 0
  },
  {
      "_id": "65187b7a8bf35b5b36a44563",
      "printer_id": "65082196ef2033988448587d",
      "address": "8.8.4.4",
      "time": {
          "year": "2023",
          "month": "ספטמבר",
          "day": "30",
          "weekday": "שבת",
          "hours": 22,
          "minutes": 48
      },
      "online": 1,
      "date": "2023-09-30T19:48:10.059Z",
      "__v": 0
  },
  {
      "_id": "65187b978bf35b5b36a445a4",
      "printer_id": "65082196ef2033988448587d",
      "address": "8.8.4.4",
      "time": {
          "year": "2023",
          "month": "ספטמבר",
          "day": "30",
          "weekday": "שבת",
          "hours": 22,
          "minutes": 48
      },
      "online": 1,
      "date": "2023-09-30T19:48:39.586Z",
      "__v": 0
  },
  {
      "_id": "65187bb68bf35b5b36a445e5",
      "printer_id": "65082196ef2033988448587d",
      "address": "8.8.4.4",
      "time": {
          "year": "2023",
          "month": "ספטמבר",
          "day": "30",
          "weekday": "שבת",
          "hours": 22,
          "minutes": 49
      },
      "online": 1,
      "date": "2023-09-30T19:49:10.060Z",
      "__v": 0
  },
  {
      "_id": "65187bd38bf35b5b36a44627",
      "printer_id": "65082196ef2033988448587d",
      "address": "8.8.4.4",
      "time": {
          "year": "2023",
          "month": "ספטמבר",
          "day": "30",
          "weekday": "שבת",
          "hours": 22,
          "minutes": 49
      },
      "online": 1,
      "date": "2023-09-30T19:49:39.561Z",
      "__v": 0
  },
  {
      "_id": "65187bf18bf35b5b36a44668",
      "printer_id": "65082196ef2033988448587d",
      "address": "8.8.4.4",
      "time": {
          "year": "2023",
          "month": "ספטמבר",
          "day": "30",
          "weekday": "שבת",
          "hours": 22,
          "minutes": 50
      },
      "online": 1,
      "date": "2023-09-30T19:50:09.564Z",
      "__v": 0
  },
  {
      "_id": "65187c108bf35b5b36a446a9",
      "printer_id": "65082196ef2033988448587d",
      "address": "8.8.4.4",
      "time": {
          "year": "2023",
          "month": "ספטמבר",
          "day": "30",
          "weekday": "שבת",
          "hours": 22,
          "minutes": 50
      },
      "online": 1,
      "date": "2023-09-30T19:50:40.062Z",
      "__v": 0
  },
  {
      "_id": "65187c2e8bf35b5b36a446ea",
      "printer_id": "65082196ef2033988448587d",
      "address": "8.8.4.4",
      "time": {
          "year": "2023",
          "month": "ספטמבר",
          "day": "30",
          "weekday": "שבת",
          "hours": 22,
          "minutes": 51
      },
      "online": 1,
      "date": "2023-09-30T19:51:10.054Z",
      "__v": 0
  },
  {
      "_id": "65187c4c8bf35b5b36a4472b",
      "printer_id": "65082196ef2033988448587d",
      "address": "8.8.4.4",
      "time": {
          "year": "2023",
          "month": "ספטמבר",
          "day": "30",
          "weekday": "שבת",
          "hours": 22,
          "minutes": 51
      },
      "online": 1,
      "date": "2023-09-30T19:51:40.052Z",
      "__v": 0
  },
  {
      "_id": "65187c6a8bf35b5b36a4476c",
      "printer_id": "65082196ef2033988448587d",
      "address": "8.8.4.4",
      "time": {
          "year": "2023",
          "month": "ספטמבר",
          "day": "30",
          "weekday": "שבת",
          "hours": 22,
          "minutes": 52
      },
      "online": 1,
      "date": "2023-09-30T19:52:10.064Z",
      "__v": 0
  },
  {
      "_id": "65187c888bf35b5b36a447ad",
      "printer_id": "65082196ef2033988448587d",
      "address": "8.8.4.4",
      "time": {
          "year": "2023",
          "month": "ספטמבר",
          "day": "30",
          "weekday": "שבת",
          "hours": 22,
          "minutes": 52
      },
      "online": 1,
      "date": "2023-09-30T19:52:40.059Z",
      "__v": 0
  },
  {
      "_id": "65187ca68bf35b5b36a447ee",
      "printer_id": "65082196ef2033988448587d",
      "address": "8.8.4.4",
      "time": {
          "year": "2023",
          "month": "ספטמבר",
          "day": "30",
          "weekday": "שבת",
          "hours": 22,
          "minutes": 53
      },
      "online": 1,
      "date": "2023-09-30T19:53:10.056Z",
      "__v": 0
  },
  {
      "_id": "65187cc48bf35b5b36a4482f",
      "printer_id": "65082196ef2033988448587d",
      "address": "8.8.4.4",
      "time": {
          "year": "2023",
          "month": "ספטמבר",
          "day": "30",
          "weekday": "שבת",
          "hours": 22,
          "minutes": 53
      },
      "online": 1,
      "date": "2023-09-30T19:53:40.056Z",
      "__v": 0
  },
  {
      "_id": "65187ce28bf35b5b36a44870",
      "printer_id": "65082196ef2033988448587d",
      "address": "8.8.4.4",
      "time": {
          "year": "2023",
          "month": "ספטמבר",
          "day": "30",
          "weekday": "שבת",
          "hours": 22,
          "minutes": 54
      },
      "online": 1,
      "date": "2023-09-30T19:54:10.064Z",
      "__v": 0
  },
  {
      "_id": "65187d008bf35b5b36a448b1",
      "printer_id": "65082196ef2033988448587d",
      "address": "8.8.4.4",
      "time": {
          "year": "2023",
          "month": "ספטמבר",
          "day": "30",
          "weekday": "שבת",
          "hours": 22,
          "minutes": 54
      },
      "online": 1,
      "date": "2023-09-30T19:54:40.059Z",
      "__v": 0
  },
  {
      "_id": "65187d1e8bf35b5b36a448f2",
      "printer_id": "65082196ef2033988448587d",
      "address": "8.8.4.4",
      "time": {
          "year": "2023",
          "month": "ספטמבר",
          "day": "30",
          "weekday": "שבת",
          "hours": 22,
          "minutes": 55
      },
      "online": 1,
      "date": "2023-09-30T19:55:10.057Z",
      "__v": 0
  },
  {
      "_id": "65187d3c8bf35b5b36a44933",
      "printer_id": "65082196ef2033988448587d",
      "address": "8.8.4.4",
      "time": {
          "year": "2023",
          "month": "ספטמבר",
          "day": "30",
          "weekday": "שבת",
          "hours": 22,
          "minutes": 55
      },
      "online": 1,
      "date": "2023-09-30T19:55:40.109Z",
      "__v": 0
  },
  {
      "_id": "65187d5a8bf35b5b36a44974",
      "printer_id": "65082196ef2033988448587d",
      "address": "8.8.4.4",
      "time": {
          "year": "2023",
          "month": "ספטמבר",
          "day": "30",
          "weekday": "שבת",
          "hours": 22,
          "minutes": 56
      },
      "online": 1,
      "date": "2023-09-30T19:56:10.062Z",
      "__v": 0
  },
  {
      "_id": "65187d788bf35b5b36a449b5",
      "printer_id": "65082196ef2033988448587d",
      "address": "8.8.4.4",
      "time": {
          "year": "2023",
          "month": "ספטמבר",
          "day": "30",
          "weekday": "שבת",
          "hours": 22,
          "minutes": 56
      },
      "online": 1,
      "date": "2023-09-30T19:56:40.062Z",
      "__v": 0
  },
  {
      "_id": "65187d968bf35b5b36a449f6",
      "printer_id": "65082196ef2033988448587d",
      "address": "8.8.4.4",
      "time": {
          "year": "2023",
          "month": "ספטמבר",
          "day": "30",
          "weekday": "שבת",
          "hours": 22,
          "minutes": 57
      },
      "online": 1,
      "date": "2023-09-30T19:57:10.053Z",
      "__v": 0
  },
  {
      "_id": "65187db48bf35b5b36a44a37",
      "printer_id": "65082196ef2033988448587d",
      "address": "8.8.4.4",
      "time": {
          "year": "2023",
          "month": "ספטמבר",
          "day": "30",
          "weekday": "שבת",
          "hours": 22,
          "minutes": 57
      },
      "online": 1,
      "date": "2023-09-30T19:57:40.050Z",
      "__v": 0
  },
  {
      "_id": "65187dd28bf35b5b36a44a78",
      "printer_id": "65082196ef2033988448587d",
      "address": "8.8.4.4",
      "time": {
          "year": "2023",
          "month": "ספטמבר",
          "day": "30",
          "weekday": "שבת",
          "hours": 22,
          "minutes": 58
      },
      "online": 1,
      "date": "2023-09-30T19:58:10.052Z",
      "__v": 0
  },
  {
      "_id": "65187df08bf35b5b36a44ab9",
      "printer_id": "65082196ef2033988448587d",
      "address": "8.8.4.4",
      "time": {
          "year": "2023",
          "month": "ספטמבר",
          "day": "30",
          "weekday": "שבת",
          "hours": 22,
          "minutes": 58
      },
      "online": 1,
      "date": "2023-09-30T19:58:40.049Z",
      "__v": 0
  },
  {
      "_id": "65187e0e8bf35b5b36a44afa",
      "printer_id": "65082196ef2033988448587d",
      "address": "8.8.4.4",
      "time": {
          "year": "2023",
          "month": "ספטמבר",
          "day": "30",
          "weekday": "שבת",
          "hours": 22,
          "minutes": 59
      },
      "online": 1,
      "date": "2023-09-30T19:59:10.055Z",
      "__v": 0
  },
  {
      "_id": "65187e2c8bf35b5b36a44b3b",
      "printer_id": "65082196ef2033988448587d",
      "address": "8.8.4.4",
      "time": {
          "year": "2023",
          "month": "ספטמבר",
          "day": "30",
          "weekday": "שבת",
          "hours": 22,
          "minutes": 59
      },
      "online": 1,
      "date": "2023-09-30T19:59:40.063Z",
      "__v": 0
  },
  {
      "_id": "65187e4a8bf35b5b36a44b7c",
      "printer_id": "65082196ef2033988448587d",
      "address": "8.8.4.4",
      "time": {
          "year": "2023",
          "month": "ספטמבר",
          "day": "30",
          "weekday": "שבת",
          "hours": 23,
          "minutes": 0
      },
      "online": 1,
      "date": "2023-09-30T20:00:10.055Z",
      "__v": 0
  },
  {
      "_id": "65187e688bf35b5b36a44bbe",
      "printer_id": "65082196ef2033988448587d",
      "address": "8.8.4.4",
      "time": {
          "year": "2023",
          "month": "ספטמבר",
          "day": "30",
          "weekday": "שבת",
          "hours": 23,
          "minutes": 0
      },
      "online": 1,
      "date": "2023-09-30T20:00:40.056Z",
      "__v": 0
  },
  {
      "_id": "65187e868bf35b5b36a44bff",
      "printer_id": "65082196ef2033988448587d",
      "address": "8.8.4.4",
      "time": {
          "year": "2023",
          "month": "ספטמבר",
          "day": "30",
          "weekday": "שבת",
          "hours": 23,
          "minutes": 1
      },
      "online": 1,
      "date": "2023-09-30T20:01:10.050Z",
      "__v": 0
  },
  {
      "_id": "65187ea48bf35b5b36a44c40",
      "printer_id": "65082196ef2033988448587d",
      "address": "8.8.4.4",
      "time": {
          "year": "2023",
          "month": "ספטמבר",
          "day": "30",
          "weekday": "שבת",
          "hours": 23,
          "minutes": 1
      },
      "online": 1,
      "date": "2023-09-30T20:01:40.057Z",
      "__v": 0
  },
  {
      "_id": "65187ec28bf35b5b36a44c81",
      "printer_id": "65082196ef2033988448587d",
      "address": "8.8.4.4",
      "time": {
          "year": "2023",
          "month": "ספטמבר",
          "day": "30",
          "weekday": "שבת",
          "hours": 23,
          "minutes": 2
      },
      "online": 1,
      "date": "2023-09-30T20:02:10.059Z",
      "__v": 0
  },
  {
      "_id": "65187ee08bf35b5b36a44cc2",
      "printer_id": "65082196ef2033988448587d",
      "address": "8.8.4.4",
      "time": {
          "year": "2023",
          "month": "ספטמבר",
          "day": "30",
          "weekday": "שבת",
          "hours": 23,
          "minutes": 2
      },
      "online": 1,
      "date": "2023-09-30T20:02:40.058Z",
      "__v": 0
  },
  {
      "_id": "65187efe8bf35b5b36a44d03",
      "printer_id": "65082196ef2033988448587d",
      "address": "8.8.4.4",
      "time": {
          "year": "2023",
          "month": "ספטמבר",
          "day": "30",
          "weekday": "שבת",
          "hours": 23,
          "minutes": 3
      },
      "online": 1,
      "date": "2023-09-30T20:03:10.060Z",
      "__v": 0
  },
  {
      "_id": "65187f1c8bf35b5b36a44d44",
      "printer_id": "65082196ef2033988448587d",
      "address": "8.8.4.4",
      "time": {
          "year": "2023",
          "month": "ספטמבר",
          "day": "30",
          "weekday": "שבת",
          "hours": 23,
          "minutes": 3
      },
      "online": 0,
      "date": "2023-09-30T20:03:40.061Z",
      "__v": 0
  },
  {
      "_id": "65187f3a8bf35b5b36a44d85",
      "printer_id": "65082196ef2033988448587d",
      "address": "8.8.4.4",
      "time": {
          "year": "2023",
          "month": "ספטמבר",
          "day": "30",
          "weekday": "שבת",
          "hours": 23,
          "minutes": 4
      },
      "online": 1,
      "date": "2023-09-30T20:04:10.050Z",
      "__v": 0
  },
  {
      "_id": "65187f588bf35b5b36a44dc6",
      "printer_id": "65082196ef2033988448587d",
      "address": "8.8.4.4",
      "time": {
          "year": "2023",
          "month": "ספטמבר",
          "day": "30",
          "weekday": "שבת",
          "hours": 23,
          "minutes": 4
      },
      "online": 1,
      "date": "2023-09-30T20:04:40.064Z",
      "__v": 0
  },
  {
      "_id": "65187f768bf35b5b36a44e07",
      "printer_id": "65082196ef2033988448587d",
      "address": "8.8.4.4",
      "time": {
          "year": "2023",
          "month": "ספטמבר",
          "day": "30",
          "weekday": "שבת",
          "hours": 23,
          "minutes": 5
      },
      "online": 1,
      "date": "2023-09-30T20:05:10.054Z",
      "__v": 0
  },
  {
      "_id": "65187f948bf35b5b36a44e48",
      "printer_id": "65082196ef2033988448587d",
      "address": "8.8.4.4",
      "time": {
          "year": "2023",
          "month": "ספטמבר",
          "day": "30",
          "weekday": "שבת",
          "hours": 23,
          "minutes": 5
      },
      "online": 1,
      "date": "2023-09-30T20:05:40.062Z",
      "__v": 0
  },
  {
      "_id": "65187fb48bf35b5b36a44e8a",
      "printer_id": "65082196ef2033988448587d",
      "address": "8.8.4.4",
      "time": {
          "year": "2023",
          "month": "ספטמבר",
          "day": "30",
          "weekday": "שבת",
          "hours": 23,
          "minutes": 6
      },
      "online": 1,
      "date": "2023-09-30T20:06:12.060Z",
      "__v": 0
  },
  {
      "_id": "65187fd08bf35b5b36a44ecb",
      "printer_id": "65082196ef2033988448587d",
      "address": "8.8.4.4",
      "time": {
          "year": "2023",
          "month": "ספטמבר",
          "day": "30",
          "weekday": "שבת",
          "hours": 23,
          "minutes": 6
      },
      "online": 1,
      "date": "2023-09-30T20:06:40.054Z",
      "__v": 0
  },
  {
      "_id": "65187fee8bf35b5b36a44f0c",
      "printer_id": "65082196ef2033988448587d",
      "address": "8.8.4.4",
      "time": {
          "year": "2023",
          "month": "ספטמבר",
          "day": "30",
          "weekday": "שבת",
          "hours": 23,
          "minutes": 7
      },
      "online": 1,
      "date": "2023-09-30T20:07:10.062Z",
      "__v": 0
  },
  {
      "_id": "6518800c8bf35b5b36a44f4d",
      "printer_id": "65082196ef2033988448587d",
      "address": "8.8.4.4",
      "time": {
          "year": "2023",
          "month": "ספטמבר",
          "day": "30",
          "weekday": "שבת",
          "hours": 23,
          "minutes": 7
      },
      "online": 1,
      "date": "2023-09-30T20:07:40.051Z",
      "__v": 0
  },
  {
      "_id": "6518802a8bf35b5b36a44f8f",
      "printer_id": "65082196ef2033988448587d",
      "address": "8.8.4.4",
      "time": {
          "year": "2023",
          "month": "ספטמבר",
          "day": "30",
          "weekday": "שבת",
          "hours": 23,
          "minutes": 8
      },
      "online": 1,
      "date": "2023-09-30T20:08:10.062Z",
      "__v": 0
  },
  {
      "_id": "651880488bf35b5b36a44fd0",
      "printer_id": "65082196ef2033988448587d",
      "address": "8.8.4.4",
      "time": {
          "year": "2023",
          "month": "ספטמבר",
          "day": "30",
          "weekday": "שבת",
          "hours": 23,
          "minutes": 8
      },
      "online": 1,
      "date": "2023-09-30T20:08:40.062Z",
      "__v": 0
  },
  {
      "_id": "651880668bf35b5b36a45011",
      "printer_id": "65082196ef2033988448587d",
      "address": "8.8.4.4",
      "time": {
          "year": "2023",
          "month": "ספטמבר",
          "day": "30",
          "weekday": "שבת",
          "hours": 23,
          "minutes": 9
      },
      "online": 1,
      "date": "2023-09-30T20:09:10.057Z",
      "__v": 0
  },
  {
      "_id": "651880848bf35b5b36a45052",
      "printer_id": "65082196ef2033988448587d",
      "address": "8.8.4.4",
      "time": {
          "year": "2023",
          "month": "ספטמבר",
          "day": "30",
          "weekday": "שבת",
          "hours": 23,
          "minutes": 9
      },
      "online": 1,
      "date": "2023-09-30T20:09:40.057Z",
      "__v": 0
  },
  {
      "_id": "651880a28bf35b5b36a45093",
      "printer_id": "65082196ef2033988448587d",
      "address": "8.8.4.4",
      "time": {
          "year": "2023",
          "month": "ספטמבר",
          "day": "30",
          "weekday": "שבת",
          "hours": 23,
          "minutes": 10
      },
      "online": 1,
      "date": "2023-09-30T20:10:10.058Z",
      "__v": 0
  },
  {
      "_id": "651880c08bf35b5b36a450d4",
      "printer_id": "65082196ef2033988448587d",
      "address": "8.8.4.4",
      "time": {
          "year": "2023",
          "month": "ספטמבר",
          "day": "30",
          "weekday": "שבת",
          "hours": 23,
          "minutes": 10
      },
      "online": 0,
      "date": "2023-09-30T20:10:40.052Z",
      "__v": 0
  },
  {
      "_id": "651880de8bf35b5b36a45115",
      "printer_id": "65082196ef2033988448587d",
      "address": "8.8.4.4",
      "time": {
          "year": "2023",
          "month": "ספטמבר",
          "day": "30",
          "weekday": "שבת",
          "hours": 23,
          "minutes": 11
      },
      "online": 0,
      "date": "2023-09-30T20:11:10.055Z",
      "__v": 0
  },
  {
      "_id": "651880fc8bf35b5b36a45156",
      "printer_id": "65082196ef2033988448587d",
      "address": "8.8.4.4",
      "time": {
          "year": "2023",
          "month": "ספטמבר",
          "day": "30",
          "weekday": "שבת",
          "hours": 23,
          "minutes": 11
      },
      "online": 1,
      "date": "2023-09-30T20:11:40.065Z",
      "__v": 0
  },
  {
      "_id": "6518811a8bf35b5b36a45197",
      "printer_id": "65082196ef2033988448587d",
      "address": "8.8.4.4",
      "time": {
          "year": "2023",
          "month": "ספטמבר",
          "day": "30",
          "weekday": "שבת",
          "hours": 23,
          "minutes": 12
      },
      "online": 1,
      "date": "2023-09-30T20:12:10.056Z",
      "__v": 0
  },
  {
      "_id": "651881388bf35b5b36a451d8",
      "printer_id": "65082196ef2033988448587d",
      "address": "8.8.4.4",
      "time": {
          "year": "2023",
          "month": "ספטמבר",
          "day": "30",
          "weekday": "שבת",
          "hours": 23,
          "minutes": 12
      },
      "online": 1,
      "date": "2023-09-30T20:12:40.050Z",
      "__v": 0
  },
  {
      "_id": "651881568bf35b5b36a45219",
      "printer_id": "65082196ef2033988448587d",
      "address": "8.8.4.4",
      "time": {
          "year": "2023",
          "month": "ספטמבר",
          "day": "30",
          "weekday": "שבת",
          "hours": 23,
          "minutes": 13
      },
      "online": 1,
      "date": "2023-09-30T20:13:10.056Z",
      "__v": 0
  },
  {
      "_id": "651881748bf35b5b36a4525a",
      "printer_id": "65082196ef2033988448587d",
      "address": "8.8.4.4",
      "time": {
          "year": "2023",
          "month": "ספטמבר",
          "day": "30",
          "weekday": "שבת",
          "hours": 23,
          "minutes": 13
      },
      "online": 1,
      "date": "2023-09-30T20:13:40.052Z",
      "__v": 0
  },
  {
      "_id": "651881928bf35b5b36a4529b",
      "printer_id": "65082196ef2033988448587d",
      "address": "8.8.4.4",
      "time": {
          "year": "2023",
          "month": "ספטמבר",
          "day": "30",
          "weekday": "שבת",
          "hours": 23,
          "minutes": 14
      },
      "online": 1,
      "date": "2023-09-30T20:14:10.054Z",
      "__v": 0
  },
  {
      "_id": "651881b08bf35b5b36a452dc",
      "printer_id": "65082196ef2033988448587d",
      "address": "8.8.4.4",
      "time": {
          "year": "2023",
          "month": "ספטמבר",
          "day": "30",
          "weekday": "שבת",
          "hours": 23,
          "minutes": 14
      },
      "online": 1,
      "date": "2023-09-30T20:14:40.058Z",
      "__v": 0
  },
  {
      "_id": "651881ce8bf35b5b36a4531d",
      "printer_id": "65082196ef2033988448587d",
      "address": "8.8.4.4",
      "time": {
          "year": "2023",
          "month": "ספטמבר",
          "day": "30",
          "weekday": "שבת",
          "hours": 23,
          "minutes": 15
      },
      "online": 1,
      "date": "2023-09-30T20:15:10.057Z",
      "__v": 0
  },
  {
      "_id": "651881ec8bf35b5b36a4535e",
      "printer_id": "65082196ef2033988448587d",
      "address": "8.8.4.4",
      "time": {
          "year": "2023",
          "month": "ספטמבר",
          "day": "30",
          "weekday": "שבת",
          "hours": 23,
          "minutes": 15
      },
      "online": 1,
      "date": "2023-09-30T20:15:40.048Z",
      "__v": 0
  },

];

data = data.map(d => {
  return {...d, ...d.time, hours: `${d.time.hours}:${d.time.minutes}`}
})

const Stats = () => {
  return (
    <Box
    gap="20px"
    sx={{
      mb: 2,
      width: "auto",
      overflow: "hidden",
      overflowX: "scroll",
    }}
  >
     <div 
    //  style={{ 
      // overflowX: "auto", 
    //   overflow: "auto", }}
    >
    <ResponsiveContainer 
    aspect={3} 
    height={500}>
      <LineChart data={data}>
        <XAxis xAxisId="0" dataKey="hours" interval={10} />
        {/* <XAxis xAxisId="1" dataKey="day" interval={3} /> */}
        <Line 
        dot={false} 
        type="step" dataKey="online" />
      </LineChart>
    </ResponsiveContainer></div>
   </Box>
  );

  // return (
  //   <LineChart

  //     xAxis={[{ data: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10] }]}
  //     series={[
  //       {
  //         curve:"step", data: [0, 1, 1, 0, 1, 0, 0, 0, 1, 0],
  //         showMark: ({ index }) => index % 2 === 0,
  //       },
  //     ]}
  //     width={500}
  //     height={300}
  //   />
  // );
};

//   return (
//     <LineChart width={600} height={300} data={data}>
//       <XAxis dataKey="date" />
//       <YAxis />
//       <CartesianGrid strokeDasharray="3 3" />
//       <Tooltip />
//       <Legend />
//       <Line type="step" dataKey="online" stroke="#8884d8" />
//     </LineChart>
//   );
// };
// };

// const DisplayChangeDates = ({ changeDates }) => {

//     if (!changeDates || changeDates.length === 0) {
//         return <div>No change dates to display.</div>;
//       }
//     return (
//       <div style={{width: "100%"}}>
//         <h2>Change Dates:</h2>
//         <ul>
//           {changeDates.map((item, index) => (
//             <li key={index}>
//               Date: {item.time}, Value: {item.online.toString()}
//             </li>
//           ))}
//         </ul>
//       </div>
//     );
//   };

// const Stats = () => {
//   const [logs, setLogs] = useState([]);
//   const fetchLogs = async () => {
//     const res = await fetch(
//       "http://localhost:8080/logs/onePrinter/65082196ef2033988448587d",
//       {
//         method: "GET",
//         headers: { "Content-Type": "application/json" },
//       }
//     );
//     const logs = await res.json();
//     setLogs(logs
//         // .slice(0, 50)
//         );
//     console.log(logs.slice(0, 10));
//   };

//   useEffect(() => {
//     fetchLogs();
//   }, []);

//   const sortedData = logs?.sort((a, b) => new Date(a.time) - new Date(b.time));

//   const displayChangeDates = () => {
//     const changeDates = [];

//     for (let i = 1; i < sortedData.length; i++) {

//       if (sortedData[i].online !== sortedData[i - 1].online) {
//         changeDates.push({
//           time: `${sortedData[i].time.day} ב${sortedData[i].time.month}, ${sortedData[i].time.hours}:${sortedData[i].time.minutes}`,
//           online: sortedData[i]?.online
//         });
//       }
//     }

//     return changeDates;
//   };

//   return (
//     <Box
//       display="grid"
//       gridTemplateColumns="repeat(12, 1fr)"
//       gridAutoRows="140px"
//       gap="20px"
//       sx={{
//         mb: 2,
//         flexDirection: "column",
//         height: "70vh",
//         overflow: "hidden",
//         overflowY: "scroll",
//       }}
//     >
//         <DisplayChangeDates changeDates={displayChangeDates()} />
//       {/* {logs?.map((log) => {
//         return (
//           <label key={log.date}>
//             <h1>{log.address}</h1>
//             <h2>{log.online.toString()}</h2>
//             <h3>{`${log.time.day} ב${log.time.month}`}</h3>
//             <h3>{`${log.time.hours}:${log.time.minutes}`}</h3>
//           </label>
//         );
//       })} */}
//     </Box>
//   );
// };

export default Stats;
