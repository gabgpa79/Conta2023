import { ChevronLeftIcon, ChevronRightIcon, ChevronDoubleLeftIcon,ChevronDoubleRightIcon } from "@heroicons/react/24/outline";

function Pagination({getData,total,paginas,current}) {
  let renderPageNumbers;


  const pageNumber = [];
  if (total !== null) {
    for (let i = 1; i <= paginas; i++) {
      pageNumber.push(i);
    }
    renderPageNumbers = pageNumber.map((number) => {
      let classes = current === number ? "border-r-2 h-5 w-5 border-white rounded text-center bg-sky-300 text-white hover:bg-sky-400 text-xs font-bold" 
      : "border-r-2 h-5 w-5 text-gray-500 border-white text-center bg-sky-50 rounded hover:text-white hover:bg-sky-400 focus:outline-none disabled:opacity-25 disabled text-xs";

      if (
        number === 1 ||
        number === total ||
        (number >= current - 2 && number <= current + 2)
      ) {
        return (
          <button
            key={number}
            className={classes}
            onClick={() => getData(number)}
          >
            {number}
          </button>
        );
      } else {
        return null;
      }
    });
}
return (  

      <ul className="flex p-1 text-xs">                
        <li 
          className={current === 1 ? "border rounded border-gray-200 flex items-center justify-center h-6 w-6 text-gray-400 mr-1 cursor-not-allowed p-1": "border rounded border-gray-300 flex items-center h-6 w-6 text-gray-400 mr-1 hover:bg-gray-200 justify-center p-1" } 
          onClick={() => getData(current === 1 ? 0 : 1)}>        
          <ChevronDoubleLeftIcon className="h-5 w-5 text-gray-400"/>
        </li>

        <li
          className={current === 1 ? "border rounded border-gray-200 flex items-center h-6 w-6 justify-center text-gray-400 mr-1 cursor-not-allowed p-1": "border rounded border-gray-300 flex items-center h-6 w-6 text-gray-400 mr-1 hover:bg-gray-200 justify-center p-1" } 
          onClick={() =>getData(current === 1 ? 0: current - 1)}>        
          <ChevronLeftIcon className="h-5 w-5 text-gray-400" />
        </li>

        <li
          className="h-6 flex items-center">        
          {renderPageNumbers}
        </li>        
        
        <li        
          className={current === paginas ? "border rounded border-gray-200 flex items-center justify-center h-6 w-6 text-gray-400 mr-1 cursor-not-allowed p-1": "border rounded border-gray-300 flex items-center h-6 w-6 text-gray-400 mr-1 hover:bg-gray-200 justify-center p-1" } 
          onClick={() => getData(current === paginas ? 0 : current + 1)}>          
          <ChevronRightIcon className="h-5 w-5 text-gray-400" />
        </li>

        <li
          className={paginas === current ? "border rounded border-gray-200   flex items-center justify-center h-6 w-6 text-gray-400 mr-1 cursor-not-allowed p-1": "border rounded border-gray-300 h-6 w-6 text-gray-400 mr-1 hover:bg-gray-200 flex items-center justify-center p-1" } 
          onClick={() => getData(current === paginas ? 0: paginas)}>
          <ChevronDoubleRightIcon className="h-4 w-4 text-gray-500" />  
        </li>     
      </ul>
    

    )}

export default Pagination
