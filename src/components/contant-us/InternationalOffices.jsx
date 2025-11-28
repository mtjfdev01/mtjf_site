import OfficeSection from './OfficeSection';
import { internationalOffices } from '../../data/contactOffices';

const InternationalOffices = () => (
  <OfficeSection title="Our International Offices" offices={internationalOffices} />
);

export default InternationalOffices;

