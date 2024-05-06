import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { CompetitorService } from './competitor-service.service';
import { Competitor } from '../models/competitor.model';

describe('CompetitorService', () => {
  let service: CompetitorService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [CompetitorService]
    });
    service = TestBed.inject(CompetitorService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTestingController.verify(); // Verify that there are no outstanding http calls
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('fetchCompetitors should return expected competitors', () => {
    const mockCompetitors: Competitor[] = [
      { id: 1, pid: 'Gymnast1', schoolName: 'Test', barPos: 1, beamPos: 2, floorPos: 3, vaultPos: 4, sub: false, meetId: 1 },
      // Add more mock competitors as needed
    ];

    service.fetchCompetitors(1, 'School1').subscribe(competitors => {
      expect(competitors.length).toBe(1);
      expect(competitors).toEqual(mockCompetitors);
    });

    // Expect a call to this URL and method
    const req = httpTestingController.expectOne(service.apiUrl + '?meetId=1&schoolName=School1');
    expect(req.request.method).toEqual('GET');
    req.flush(mockCompetitors); // Fulfill the request by returning mockCompetitors
  });

  // Example test for updateCompetitor
  it('updateCompetitor should update a competitor', () => {
    const mockCompetitor: Competitor = { id: 1, pid: 'Gymnast1', schoolName: 'Test', barPos: 1, beamPos: 2, floorPos: 3, vaultPos: 4, sub: false, meetId: 1 };

    service.updateCompetitor(mockCompetitor).subscribe(updated => {
      expect(updated).toEqual(mockCompetitor);
    });

    const req = httpTestingController.expectOne(`${service.apiUrl}/1`);
    expect(req.request.method).toEqual('PUT');
    expect(req.request.body).toEqual(mockCompetitor);
    req.flush(mockCompetitor);
  });

  // Add more tests as necessary
});

