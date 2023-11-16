import Link from "next/link";

interface DataInterface {
  id: number;
  label: string;
}
const Footer = () => {
  const inforData: DataInterface[] = [{ id: 0, label: 'About Us' }, { id: 1, label: 'About Zip' }, { id: 2, label: 'Privacy Policy' }, { id: 3, label: 'Search' }, { id: 4, label: 'Terms' }, { id: 5, label: 'Orders and Returns' }, { id: 6, label: 'Contact Us' }, { id: 7, label: 'Advanced Search' }, { id: 8, label: 'Newskletter Subcription' }];
  const pcPartsData: DataInterface[] = [{ id: 0, label: 'CPUS' }, { id: 1, label: 'Add On Cards' }, { id: 2, label: 'Hard Drives (Internal)' }, { id: 3, label: 'Graphic Cards' }, { id: 4, label: 'Keyboards / Mice' }, { id: 5, label: 'Cases / Power Suppliers / Cooling' }, { id: 6, label: 'RAM (Memory)' }, { id: 7, label: 'Software' }, { id: 8, label: 'Speakers / Headsets' }, { id: 9, label: 'Motherboards' }];
  const destopPCsData: DataInterface[] = [{ id: 0, label: 'Custom PCs' }, { id: 1, label: 'Servers' }, { id: 2, label: 'MSI All-In-One PCs' }, { id: 3, label: 'HP/Compaq PCs' }, { id: 4, label: 'ASUS PCs' }, { id: 5, label: 'Tecs PCs' }];
  const laptopData: DataInterface[] = [{ id: 0, label: 'Evryday Use Notebooks' }, { id: 1, label: 'MSI Workstation Series' }, { id: 2, label: 'MSI Prestige Series' }, { id: 3, label: 'Tablets and Pads' }, { id: 4, label: 'Netbooks' }, { id: 5, label: 'Infinity Gaming Notebooks' }];
  return (
    <div className='flex h-[521px] w-full bg-[#020203] flex-col py-[10px] px-[100px]'>
      <div className='flex-[3] flex justify-between items-center'>
        <div className='flex flex-col gap-2'>
          <h1 className='text-[30px] text-white font-medium'>Sign Up To Our Newletter. </h1>
          <h2 className='text-[15px] text-white'>Be the first to hear about the latest offers.</h2>
        </div>
        <div className="flex gap-5">
          <input type='email' className='rounded-[4px] bg-transparent border-white border-2 p-[10px] h-[40px] md:w-[300px] text-white' placeholder='Your email' />
          <button className='bg-[#0156FF] text-white rounded-[50px] w-[151px] h-[40px]'>Subscribe</button>
        </div>
      </div>
      <div className='flex-[6] flex w-full'>
        <div>
          <h3 className='text-gray-400 font-bold'>Information</h3>
          <div className="flex flex-col">
            {inforData.map(item => (<Link href={`${item.label}`} key={item.id} className='text-white text-[15px]'>{item.label}</Link>))}
          </div>
        </div>
        <div>
          <h3 className='text-gray-400 font-bold'>PC Parts</h3>
          <div className="flex flex-col">
            {pcPartsData.map(item => (<Link href={`${item.label}`} className="text-white text-[15px]">{item.label}</Link>))}
          </div>
        </div>
        <div>
          <h3 className='text-gray-400 font-bold'>Desktop PCs</h3>
        </div>
        <div>
          <h3 className='text-gray-400 font-bold'>Lapttops</h3>
        </div>
        <div>
          <h3 className='text-gray-400 font-bold'>Address</h3>
        </div>
      </div>
      <div className='flex-[1]'></div>
      <div></div>
    </div >
  );
};

export default Footer;
