import React, { useEffect} from 'react';
import { useSelector } from 'react-redux';
import parse from 'html-react-parser';

export default function Topic() {

    const coursework = useSelector((state) => state.coursework)



    return (
        <>
            {parse(coursework.data.content)}
        </>
        
    )
}


    // const string = `<h1 class='mb-4 text-4xl font-extrabold leading-none tracking-tight text-green-500 md:text-5xl lg:text-6xl dark:text-white'>ATM</h1>\n<h2 class='mb-2 text-lg font-semibold text-slate-200 dark:text-white'>Objectives:</h2>\n<ul class='max-w-md space-y-1 text-green-600 list-disc list-inside dark:text-gray-400'>\n<li> \nPractice conditional statements and method implementation in Ruby.\n</li>\n<li>\n    Reinforce problem-solving skills with Ruby by designing a simple banking transaction system.\n</li>\n</ul>\n<p class='mb-6 text-lg font-normal text-slate-50 lg:text-xl  dark:text-gray-400'>Let's put our understanding of conditionals to the test. We're going to create a simple method with one input. Our method will be called withdraw() and the input will be digits. The initial balance is 1000. There will be four possible outcomes to this method. <ul class='max-w-md space-y-1 text-slate-50 list-disc list-inside dark:text-gray-400'>\n<li> \nThe user inputted more than maximum limit (10,000), return 'Error. Maximum is 10000.'\n</li>\n<li>\n    The input was less than minimum limit (200), return 'Error. Minimum is 200.'\n</li>\n</ul></p>\n<pre class='p-2 bg-slate-500'>def withdraw digits\n    number = 1000\n    # your code here\nend </pre>
    // `