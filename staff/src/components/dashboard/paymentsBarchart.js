import React from 'react';
import { BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';


export default function PaymentsBarcharts(){

    const data = [
        { day: 'Sun', value: 40 },
        { day: 'Mon', value: 55 },
        { day: 'Tue', value: 75 },
        { day: 'Wed', value: 81 },
        { day: 'Thu', value: 56 },
        { day: 'Fri', value: 55 },
        { day: 'Sat', value: 40 },
        ];
    
      return (
        <>
        <div>Payments</div>
            <ResponsiveContainer width="100%" height={300}>
          <BarChart data={data} >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="day" scale="point" padding={{ left: 50, right: 50 }}  />
            <YAxis />
            <Tooltip />
            {/* <Bar dataKey="day" fill="#8884d8" /> */}
          <Bar dataKey="value" fill="#82ca9d" />
                    </BarChart>
        </ResponsiveContainer>
        </>

      );
    };
