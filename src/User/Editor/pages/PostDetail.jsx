import { useParams, Link, useNavigate } from "react-router-dom";
import React from 'react'

const postDetail = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  console.log('id',id);
  
  return (
    <div className="post_details-container ">
      <div className=" md:flex max-w-5xl w-full">
        <div className="rounded-lg border border-dark-4/80">
    <div className="grid min-h-svh items-start space-y-0 text-sm ">
      <header className="py-6">
        <div className="container px-4 md:px-6">
          <h1 className="text-3xl font-bold tracking-tighter">Introducing Shadcn: The AI-Powered Design Assistant</h1>
        </div>
      </header>
      <main className="grid gap-6 pb-6 lg:grid-cols-3 lg:gap-12">
        <div className="container px-4 space-y-4 text-justify md:space-y-6 md:px-6 lg:col-start-2 lg:col-span-2 lg:space-y-8">
          <p>
            We are thrilled to announce the launch of Shadcn, the AI-powered design assistant. Shadcn is an innovative
            tool designed to empower developers and designers by providing them with quick access to beautiful and
            functional UI components.
          </p>
          <p>
            With Shadcn, you can easily generate code for a wide range of components, including buttons, cards, forms,
            navigation bars, and more. Whether you are working on a website, web app, or mobile app, Shadcn has you
            covered.
          </p>
          
        </div>
      </main>
      <footer className="border border-dark-4/80">
        <div className="container flex items-center justify-between px-4 py-4 md:px-6">
          <div className="flex items-center space-x-4">
            <img
              alt="Shadcn"
              className="rounded-full"
              height={32}
              src="/placeholder.svg"
              style={{
                aspectRatio: "32/32",
                objectFit: "cover",
              }}
              width={32}
            />
            <div className="flex flex-col">
              <div className="font-semibold">Shadcn</div>
              <div className="text-xs text-gray-500 dark:text-gray-400">AI-Powered Design Assistant</div>
            </div>
          </div>
          <div className="flex items-center space-x-4">
          <button type="submit"  className='bg-gray-800 p-3 h-14 w-36 rounded-lg mt-6 hover:bg-primary-500 '> Save</button>
          <button type="submit"  className='bg-gray-800 p-3 h-14 w-36 rounded-lg mt-6 hover:bg-primary-500 '> Request</button>

          </div>
        </div>
      </footer>
    </div> 
    </div> 
    </div> 
    </div> 
     )
}

export default postDetail