import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { MainLayout } from "./layouts/main-layout";
import { HomePage } from "./pages/home";
import { ContentLibraryPage } from "./pages/content-library";
import { MapPage } from "./pages/map";
import { PassionDiscoveryPage } from "./pages/passion-discovery";
import { ActionHubPage } from "./pages/action-hub";
import { CommunityPage } from "./pages/community";
import { isMobile } from "./utils/device-detection";

const App: React.FC = () => {
  const [isMobileDevice, setIsMobileDevice] = React.useState(false);
  
  React.useEffect(() => {
    setIsMobileDevice(isMobile());
    
    const handleResize = () => {
      setIsMobileDevice(isMobile());
    };
    
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);
  
  return (
    <Router>
      <MainLayout isMobile={isMobileDevice}>
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route path="/content-library" component={ContentLibraryPage} />
          <Route path="/map" component={MapPage} />
          <Route path="/passion-discovery" component={PassionDiscoveryPage} />
          <Route path="/action-hub" component={ActionHubPage} />
          <Route path="/community" component={CommunityPage} />
        </Switch>
      </MainLayout>
    </Router>
  );
};

export default App;