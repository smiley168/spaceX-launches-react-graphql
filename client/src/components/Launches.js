// https://www.apollographql.com/docs/react/essentials/get-started/
// is like the react-redux packages
// npm install apollo-boost react-apollo graphql --save
// This is where we want to make query to GraphQL
//shortcut: 'rce' will b ring up a class based component for me automagicially

import React, { Component, Fragment } from 'react'
import gql from 'graphql-tag';
import { Query } from 'react-apollo';
import { ApolloClient } from 'apollo-boost';
import LaunchItem from './LaunchItem';
import MissionKey from './MissionKey';


const LAUNCHES_QUERY = gql`
    query LaunchesQuery {
        launches {
            flight_number
            mission_name
            launch_date_local
            launch_success
        }
    }
`;
/**
 * 405 mehtod not allowed need CORS
 */
export class Launches extends Component {
    render() {
        return (
            <Fragment>
                <h1 className="display-4 my-3">Launches</h1>
                <MissionKey />
                <Query query={LAUNCHES_QUERY}>
                    {
                        ({ loading, error, data }) => {
                            if(loading) return <h4>Loading ... </h4>
                            if(error) console.log(error);
                            // console.log(data);

                            return <Fragment>
                                {
                                    data.launches.map(launch => (
                                        <LaunchItem key={launch.flight_number} launch={launch} />
                                    ))
                                }
                            </Fragment>;
                        }
                    }
                </Query>
            </Fragment>
        )
    }
}

export default Launches
