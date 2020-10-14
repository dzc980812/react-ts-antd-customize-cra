import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import BasicLayout from './layout/BasicLayout';
import routers from './router';
// import { renderRoutes } from 'react-router-config'

function App() {
	return (
    
		<BrowserRouter>
			<Switch>
				{routers.map((item: any, key: number) => {
					return (
						<Route
							exact
							key={key}
							path={item.path}
							render={(props: any) => {
								return (
									<BasicLayout {...props}>
										<item.component {...props} />
									</BasicLayout>
								);
								// return item.name === 'Login' ? (
								// 	<item.component {...props} />
								// ) : (
								// 	<BasicLayout {...props}>
								// 		<item.component {...props} />
								// 	</BasicLayout>
								// );
							}}
						/>
					);
				})}
        
			</Switch>
		</BrowserRouter>
	);
}
export default App;
