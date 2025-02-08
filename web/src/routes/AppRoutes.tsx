import { Routes, Route } from 'react-router-dom';
import LandingPage from '../pages/LandingPage/LandingPage';
import InstructionDetailsPage from '../pages/InstructionDetailsPage/InstructionDetailsPage';
import GroupDetailsPage from '../pages/GroupDetailsPage/GroupDetailsPage';
import SearchPage from '../pages/SearchPage/SearchPage';
import ManageInstructionsPage from '../pages/ManageInstructionsPage/ManageInstructionsPage';

function AppRoutes() {
  return (
    <Routes>
      <Route path="/manage-instructions" element={<ManageInstructionsPage />} />
      <Route path="/" element={<LandingPage />} />
      <Route path="/instructions/:id" element={<InstructionDetailsPage />} />
      <Route path="/groups/:id" element={<GroupDetailsPage />} />
      <Route path="/search" element={<SearchPage />} />
    </Routes>
  );
}

export default AppRoutes;