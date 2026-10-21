import Link from 'next/link'


const NotFound = () => {
    return (

      <div className="flex text-3xl font-bold flex-col items-center justify-center h-screen gap-3">
      <h2>Not Found !!</h2>
      <p>Could not find requested resource</p>
      <Link className=' hover:text-green-500' href="/">Return Home</Link>
    </div>
        
    );
};

export default NotFound;