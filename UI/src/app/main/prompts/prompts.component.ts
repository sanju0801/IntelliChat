import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { AppService } from '../../app.service';

@Component({
  selector: 'app-prompts',
  templateUrl: './prompts.component.html',
  styleUrls: ['./prompts.component.scss']
})

export class PromptsComponent implements AfterViewInit {
  chatHistory: { question: string, answer: string, isLoading: boolean, upvoted: boolean, downvoted: boolean }[] = [];
  searchKeyword: string = '';
  output: any;
  answer: any;
  isDisable = true;
  selectedProject: any;
  projects: any;
  feedback: any;
  like = "";

  constructor(private appService: AppService) {
    const storedHistory = sessionStorage.getItem('chatHistory');
    if (storedHistory) {
      this.chatHistory = JSON.parse(storedHistory);
    }
    if (sessionStorage.getItem('isFirstTimeLoad') == 'true') {
      window.location.reload();
      sessionStorage.setItem('isFirstTimeLoad', 'false');
    }
  }

  @ViewChild('chatContainer', { static: true }) chatContainer!: ElementRef;

  ngAfterViewInit() {
    this.scrollToBottom();
    this.getProjectData();
  }

  getProjectData() {
    this.appService.getProjectData().subscribe((result: any) => {
      this.projects = result["response"];
    });
  }

  submit() {
    this.isDisable = true;
    this.feedback = "";
    if (!this.searchKeyword.trim()) {
      return;
    }
    this.chatHistory.push({ question: this.searchKeyword, answer: '', isLoading: true, upvoted: false, downvoted: false });
    this.scrollToBottom();
    this.appService.askMe({ "question": this.searchKeyword, "project_name": this.selectedProject }).subscribe(res => {
      this.output = res;
      this.answer = this.output.answer;
      this.chatHistory[this.chatHistory.length - 1].answer = this.answer;
      this.chatHistory[this.chatHistory.length - 1].isLoading = false;
      sessionStorage.setItem('chatHistory', JSON.stringify(this.chatHistory));
      this.isDisable = false;
      this.scrollToBottom();
    });
    this.searchKeyword = '';
    this.scrollToBottom();
  }

  onProjectChange(event: any) {
    this.isDisable = false;
    this.selectedProject = event.value;
  }

  scrollToBottom() {
    try {
      this.chatContainer.nativeElement.scrollTop = this.chatContainer.nativeElement.scrollHeight;
    } catch (err) { }
  }

  onFeedback(chat: any) {
    const obj = {
      "question": chat.question,
      "answer": chat.answer,
      "project": this.selectedProject,
      "feedback": this.feedback,
    }
    this.appService.feedback(obj).subscribe(res => { });
  }

  onUp(chat: any) {
    if (chat.upvoted) {
      chat.upvoted = false;
      this.feedback = "neutral";
    } else {
      chat.upvoted = true;
      chat.downvoted = false;
      this.feedback = "like";
    }
    this.onFeedback(chat);
  }

  onDown(chat: any) {
    if (chat.downvoted) {
      chat.downvoted = false;
      this.feedback = "neutral";
    } else {
      chat.downvoted = true;
      chat.upvoted = false;
      this.feedback = "disLike";
    }
    this.onFeedback(chat);
  }
}
