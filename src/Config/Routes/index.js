import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";

import CampaignItems from "../../Pages/CampaignItems/index";
import { CampaignItemsProvider } from "../../Contexts/Components/CampaignItemsContext";

export default function Router() {
  return (
    <BrowserRouter>
      <Switch>
        <Route
          component={(props) => (
            <CampaignItemsProvider>
              <CampaignItems {...props} />
            </CampaignItemsProvider>
          )}
          exact
          path="/"
        />
      </Switch>
    </BrowserRouter>
  );
}
