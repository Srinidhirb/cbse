import React, { useState } from 'react';
import Nav from '../components/Nav';
import Suc from '../Assets/success.png';
import Hero from '../Assets/hero.png';
import Stu from '../Assets/student.png';
import Sucess from '../Assets/suc.png';
import courses from '../Assets/courses.png';
import exp from '../Assets/exp.png';
import step1 from '../Assets/step1.png'; // Replace with your step images
import step2 from '../Assets/step2.png'; // Replace with your step images
import step3 from '../Assets/step3.png'; // Replace with your step images
import step4 from '../Assets/step4.png'; // Replace with your step images
import TestimonialSection from '../components/TestimonialSection';
import CardCarousel from '../components/CardCarousel';

function home() {
  const [selectedStep, setSelectedStep] = useState('signup');

  // Function to render the image based on the selected step
  const renderStepImage = () => {
    switch (selectedStep) {
      case 'signup':
        return <img src={step1} alt="Step 1: Sign Up" className='w-full h-auto' />;
      case 'getaccess':
        return <img src={step2} alt="Step 2: Get Access" className='w-full h-auto' />;
      case 'practice':
        return <img src={step3} alt="Step 3: Practice Questions" className='w-full h-auto' />;
      case 'result':
        return <img src={step4} alt="Step 4: Get Results" className='w-full h-auto' />;
      default:
        return null;
    }
  };

  return (
    <div className="App">
      <Nav />
      {/* Hero Section */}
      <div className='w-full h-[90vh] flex justify-evenly items-center flex-col md:flex-row flex-wrap'>
        {/* Content */}
        <div className='flex w-[32rem] leading-5 gap-7 flex-col'>
          <span className='text-4xl font-medium'>
            Take <span className='text-blue-900 font-bold capitalize'>student experience </span>
            to the next level
          </span>
          <span>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy.</span>
          <div className='flex gap-14 items-center'>
            <span className='py-3 h-12 px-5 rounded-2xl bg-cyan-200 cursor-pointer border border-black text-base font-semibold'>Join Now</span>
            <img src={Suc} alt="Success illustration" />
          </div>
        </div>
        <img src={Hero} alt="Hero illustration" className='w-auto h-[75%] max-w-full' />
      </div>

      {/* Success Section */}
      <div className='w-full  m-auto max-w-7xl mb-14'>
        <span className='text-center text-3xl font-semibold block'>Our Success</span>
        <div className="flex w-full justify-center gap-14 my-11 flex-wrap">
          <div className='border-2 border-blue-900 w-60 h-56 rounded-xl flex flex-col gap-2 items-center justify-center'>
            <img src={Stu} alt="Students" />
            <span className='text-3xl text-blue-900 font-bold'>1000+</span>
            <p className='text-base font-semibold'>Number of students</p>
          </div>
          <div className='border-2 border-blue-900 w-60 h-56 justify-center rounded-xl flex flex-col gap-2 items-center'>
            <img src={Sucess} alt="Success rate" />
            <span className='text-3xl text-blue-900 font-bold'>98%</span>
            <p className='text-base font-semibold'>Percentage of success</p>
          </div>
          <div className='border-2 border-blue-900 w-60 h-56 justify-center rounded-xl flex flex-col gap-2 items-center'>
            <img src={courses} alt="Courses" />
            <span className='text-3xl text-blue-900 font-bold'>4</span>
            <p className='text-base font-semibold'>Number of Courses</p>
          </div>
          <div className='border-2 border-blue-900 w-60 h-56 justify-center rounded-xl flex flex-col gap-2 items-center'>
            <img src={exp} alt="Experience" />
            <span className='text-3xl text-blue-900 font-bold'>18+</span>
            <p className='text-base font-semibold'>Years of experience</p>
          </div>
        </div>
      </div>

      {/* How it works Section */}
      <div className='w-full max-w-7xl m-auto mb-20'>
        <span className='text-center text-3xl font-semibold block mb-10'>How it works</span>
        <div className="flex justify-evenly    items-center">
          {/* Steps Sidebar */}
          <div className=" flex flex-col gap-4">
            <div
              className={`p-4 rounded-lg cursor-pointer ${selectedStep === 'signup' ? 'bg-blue-600 text-white' : 'bg-white text-black'} shadow`}
              onClick={() => setSelectedStep('signup')}
            >
              <h3 className="text-lg font-semibold">Sign Up</h3>
              <p>Montes Vivamus Curve Quisque Et Primis Pretium Nullam.</p>
            </div>

            <div
              className={`p-4 rounded-lg cursor-pointer ${selectedStep === 'getaccess' ? 'bg-blue-600 text-white' : 'bg-white text-black'} shadow`}
              onClick={() => setSelectedStep('getaccess')}
            >
              <h3 className="text-lg font-semibold">Get Access</h3>
              <p>Montes Vivamus Curve Quisque Et Primis Pretium Nullam.</p>
            </div>

            <div
              className={`p-4 rounded-lg cursor-pointer ${selectedStep === 'practice' ? 'bg-blue-600 text-white' : 'bg-white text-black'} shadow`}
              onClick={() => setSelectedStep('practice')}
            >
              <h3 className="text-lg font-semibold">Practice Questions</h3>
              <p>Prepare for the exam with revision and tracking features.</p>
            </div>

            <div
              className={`p-4 rounded-lg cursor-pointer ${selectedStep === 'result' ? 'bg-blue-600 text-white' : 'bg-white text-black'} shadow`}
              onClick={() => setSelectedStep('result')}
            >
              <h3 className="text-lg font-semibold">Get Result</h3>
              <p>Compare your results with peers with advanced analytics.</p>
            </div>
          </div>

          {/* Step Image Display */}
          <div className=" flex justify-center items-center">
            {renderStepImage()}
          </div>
        </div>
  
      </div>

      <CardCarousel/>
      <TestimonialSection/>
    </div>
  );
}

export default home;
