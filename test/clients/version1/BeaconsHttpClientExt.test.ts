import { ConfigParams } from 'pip-services3-commons-node';
import { Descriptor } from 'pip-services3-commons-node';
import { References } from 'pip-services3-commons-node';

import { BeaconsHttpClientV1 } from '../../../src/clients/version1/BeaconsHttpClientV1';
import { BeaconsClientV1Fixture } from './BeaconsClientV1Fixture';

suite('BeaconsHttpClientV1', () => {
    
    let client: BeaconsHttpClientV1;
    let fixture: BeaconsClientV1Fixture;

    setup((done) => {

        let httpConfig = ConfigParams.fromTuples(
            'connection.protocol', 'http',
            'connection.port', 3000,
            'connection.host', 'localhost'
        );

        client = new BeaconsHttpClientV1();
        client.configure(httpConfig);
        let references = References.fromTuples(
            new Descriptor('beacons', 'client', 'http', 'default', '1.0'), client
        );
       
        client.setReferences(references);
        fixture = new BeaconsClientV1Fixture(client);
        client.open(null, done);
           
    });

    teardown((done) => {
        client.close(null, (err) => {
           
        });
    });

    test('CRUD Operations', (done) => {
        fixture.testCrudOperations(done);
    });

    test('Calculate Position', (done) => {
        fixture.testCalculatePosition(done);
    });

});