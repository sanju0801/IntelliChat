import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class AppService {
  user: any;
  private sideNav = new BehaviorSubject<any>('');
  private userStory = new BehaviorSubject<any>('');

  userStoryData = this.userStory.asObservable();
  sideNavData = this.sideNav.asObservable();

  constructor(private http: HttpClient) { }

  private baseUrl = '/api';

  isAuthenticated() {
    if (this.getUser()) {
      return true;
    } else {
      return false;
    }
  }

  getUser() {
    this.user = sessionStorage.getItem('userName')
    return this.user;
  }

  sideNavShowEvent(navData: any) {
    this.sideNav.next(navData);
  }

  userStoryDataShowEvent(story: any) {
    this.userStory.next(story);
  }

  // workspace
  getCount() {
    const url = this.baseUrl + "/dashboard/" + this.user;
    return this.http.get(url);
  }

  getExecutionStatus() {
    const url = this.baseUrl + "/executionStatus/" + this.user;
    return this.http.get(url);
  }

  getAllExecutionStatus() {
    const url = this.baseUrl + "/allExecutionStatus/" + this.user;
    return this.http.get(url);
  }

  getBugStatus() {
    const url = this.baseUrl + "/bug/" + this.user;
    return this.http.get(url);
  }


  // askMe
  askMe(query: any) {
    const url = this.baseUrl + "/ask";
    return this.http.post(url, query);
  }

  feedback(data: any) {
    const url = this.baseUrl + "/feedback_api";
    return this.http.post(url, data);
  }

  // 5g testcase
  testcase(data: any) {
    const url = this.baseUrl + "/test";
    return this.http.post(url, data);
  }

  URL(data: any) {
    const url = this.baseUrl + "/test/url";
    return this.http.post(url, data);
  } 

  testscript(data: any) {
    const url = this.baseUrl + "/ask/tm/testscripts";
    return this.http.post(url, data);
  }


  //fieldAssist  
  askAssist(data: any) {
    const url = this.baseUrl + "/fieldAsk";
    return this.http.post(url, data);
  }

  fieldAssist(data: any) {
    const url = this.baseUrl + "/assist/" + this.user;
    return this.http.post(url, data);
  }

  fetchAlarm(data: any) {
    const url = this.baseUrl + "/alarm_api";
    return this.http.post(url, data);
  }

  analyzeLogs(data: any) {
    const url = this.baseUrl + "/analyze_logs";
    return this.http.post(url, data);
  }

  serviceDown(data: any) {
    const url = this.baseUrl + "/assist_service";
    return this.http.post(url, data);
  }

  genralHelp(data: any) {
    const url = this.baseUrl + "/assist_general";
    return this.http.post(url, data);
  }

  openJiraTicket() {
    const url = this.baseUrl + "/jiraticket";
    return this.http.get(url);
  }

  createJiraTicket(data: any) {
    const url = this.baseUrl + "/jiraissue";
    return this.http.post(url, data);
  }

  fetchAlarmHistory(data: any) {
    const url = this.baseUrl + "/history_api";
    return this.http.post(url, data);
  }

  // projects
  getProjectData() {
    const url = this.baseUrl + "/projects/" + this.user;
    return this.http.get(url);
  }

  createProject(data: any) {
    const url = this.baseUrl + "/projects/" + this.user;
    return this.http.post(url, data);
  }

  deleteProject(id: any) {
    const url = this.baseUrl + "/projects/" + this.user + "/" + id;
    return this.http.delete(url, id);
  }

  loadProjectDetails(id: any) {
    const url = this.baseUrl + "/projects/" + this.user + "/" + id;
    return this.http.get(url);
  }

  fetchJiraProject() {
    const url = this.baseUrl + "/jira/projects/";
    return this.http.get(url);
  }

  getProjectdata(data: any) {
    const url = this.baseUrl + "/projectData/" + this.user;
    return this.http.post(url, data);
  }

  //user story
  getUserStory() {
    const url = this.baseUrl + "/userstory/" + this.user;
    return this.http.get(url);
  }

  getUserStoryForProject(project: any) {
    const url = this.baseUrl + "/userstory/" + project + "/" + this.user;
    return this.http.get(url);
  }

  loadUserStory(uId: any) {
    const url = this.baseUrl + "/testcases/" + this.user + "/" + uId;
    return this.http.get(url);
  }

  getMultipleUserstory(data: any) {
    const url = this.baseUrl + "/testcases/" + this.user;
    return this.http.post(url, data);
  }

  deleteUserStory(id: any) {
    const url = this.baseUrl + "/userstory/" + this.user + "/" + id;
    return this.http.delete(url, id);
  }

  createUserStory(data: any) {
    const url = this.baseUrl + "/userstory/" + this.user;
    return this.http.post(url, data);
  }

  fetchJiraUserStory(projectKey: any) {
    const url = this.baseUrl + "/jira/userstory/" + projectKey;
    return this.http.get(url);
  }

  //report 
  report(data: any) {
    const url = this.baseUrl + "/report/" + this.user;
    return this.http.post(url, data);
  }

  //testbed 
  getDevices() {
    const url = "assets/Devices.json"
    return this.http.get(url);
  }

  addTestbedData(data: any) {
    const url = this.baseUrl + "/testbed/" + this.user;
    return this.http.post(url, data);
  }

  getTestbedData() {
    const url = this.baseUrl + "/testbed/" + this.user;
    return this.http.get(url);
  }

  updateTestbedData(data: any, id: any) {
    const url = this.baseUrl + "/testbed/" + this.user + "/" + id;
    return this.http.put(url, data);
  }

  deleteTestbedData(id: any) {
    const url = this.baseUrl + "/testbed/" + this.user + "/" + id;
    return this.http.delete(url);
  }

  // Testcase management
  getAnswer(query: any, type: any) {
    const url = this.baseUrl + "/ask/tm/" + type;
    return this.http.post(url, query);
  }

  execute(obj: any) {
    const url = this.baseUrl + "/execute/" + this.user;
    return this.http.post(url, obj);
  }

  rca(obj: any) {
    const url = this.baseUrl + "/tsoutput/" + this.user;
    return this.http.post(url, obj);
  }

  deleteTestCase(tc_id: any) {
    const url = this.baseUrl + "/userstory/tc/" + this.user + "/" + tc_id;
    return this.http.delete(url, tc_id);
  }

  createJira(data: any) {
    const url = this.baseUrl + "/jira/" + this.user;
    return this.http.post(url, data)
  }

  updateJira(data: any, jiraId: any) {
    const url = this.baseUrl + "/jira/" + jiraId;
    return this.http.put(url, data)
  }

  createChildJira(data: any) {
    const url = this.baseUrl + "/jira/createchild";
    return this.http.post(url, data)
  }

  updateChildJira(data: any) {
    const url = this.baseUrl + "/jira/updatechild";
    return this.http.put(url, data)
  }

  // Jira settings
  getFormData() {
    const url = this.baseUrl + "/settings/jira";
    return this.http.get(url);
  }

  addFormData(data: any) {
    const url = this.baseUrl + "/settings/jira";
    return this.http.put(url, data);
  }

  EditFormData(data: any) {
    const url = this.baseUrl + "/settings/jira";
    return this.http.put(url, data);
  }

  deleteFormData(rowId: any) {
    const url = this.baseUrl + "/settings/jira/" + rowId;
    return this.http.delete(url);
  }

  // file upload
  uploadFile(data: any, projectName: any) {
    const url = this.baseUrl + "/upload/" + this.user + "/" + projectName;
    return this.http.post(url, data)
  }

  uploadFile2(data: any) {
    const url = this.baseUrl + "/upload/" + this.user;
    return this.http.post(url, data)
  }

  assist_field (data : any) {
    const url = this.baseUrl + "/assist_field/" + this.user;
    console.log(url);
    return this.http.post(url, data);
  }

  getFileList() {
    const url = this.baseUrl + "/files/" + this.user;
    return this.http.get(url);
  }

  downloadFile(projectName: any, fileName: any) {
    const url = this.baseUrl + "/download/" + this.user + "/" + projectName + "/" + fileName;
    return this.http.get(url, { responseType: 'blob' });
  }

  runIngest(projectName: any, fileName: any) {
    const url = this.baseUrl + "/ingest/" + this.user + "/" + projectName + "/" + fileName;
    return this.http.post(url, fileName);
  }
}
