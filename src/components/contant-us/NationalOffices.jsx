import OfficeSection from './OfficeSection';
import { nationalOffices } from '../../data/contactOffices';

const NationalOffices = () => (
  <OfficeSection title="Our National Offices"offices={nationalOffices}/>
);

export default NationalOffices;

