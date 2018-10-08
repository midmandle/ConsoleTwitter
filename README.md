# ConsoleTwitter
To run the project follow the steps below:

    - Open a console in the root of the project.
    - Run 'npm install' from the console.
    - Run 'node index.js'.

Completing the above steps will install the project and start it running inside your console.

The following commands can be executed in the running program:

Reading:

    - Running the command '<username>' (e.g. 'Alice'), will show you a chronologically ordered list of the users posts.

Following:

    - Running the command '<username> follows <username>' (e.g. 'Alice follows Bob'), will setup the user first user to follow the second.
      The effect of this is that the first user will get an aggregated list of both their and the followed user's posts on their wall.

Wall:

    - Running the command '<username> wall' (e.g. 'Alice wall'), will display the user's wall. The wall of a user is an aggregated list of 
      posts of both them and the users they follow in chronological order. 

Posting:

    - Running the command '<username> -> <message_text_of_any_length>' (e.g. 'Alice -> Hello y'all! How's it going?'), will create a new post
      for the given user. If that user already exists it will store/save that post against the user's profile. If the user doesn't already exist
      then they user will be created and the post will still be stored against the new user.

The program will keep the current session's data in memory for the lifetime of the process. After the program is closed and the process is 
exited all data will be lost.

Potential Improvements:

In future iterations of the code I would likely make the following changes:

    - If opting to create the project following OOP principles I would choose to user a different language (probably Java).
      While Node and JavaScript was a 'easy' choice to get a working prototype I felt restricted by the lack of more standard
      OO facilities (e.g. Interfaces, abstract classes, strong/strict typing). While OO designs can be implemented in JavaScript,
      it felt lacking in some areas.
    
    - I would like to have implemented following more Functional principles. JavaScript could have proved a very good language to implement
      this code following Functional principles but unfortunately I do not have much experience with the Functional paradigms.

    - Given the choice to write the project in JavaScript and the afforementioned limitations of the language, my predominant focus for this
      project was simplicity. The project has been written to be as easy to read and understand as possible. I believe that a more SOLID design
      could have been implemented had I had more experience and better understanding of the principles. However, given my limitations, I felt that
      attempting to implement a better SOLID design would've produced more complicated and potentially less understandable code.

    - The UserTimeline class could potentially have been eliminated from the project and incorporated into the User class. I was of two minds what
      I should do on this matter. The UserTimeline class offers no benefit from being it's own class and makes calls to create new posts look clumsy
      (e.g. 'user.timeline.posts.push(newPost)'). However, incorporating it into the User class would have made the User class larger and less focused.
      Making the UserTimeline it's own class was ultimately chosen as it indicates the the User class could be extended with other aspects to the user
      if they desired more functionality in the future (e.g. images, settings etc.).

    - The Wall class could have likely been made a static class without the need for instatiation but I was unsure if I would need to extend the Wall concept
      to incorporate additional functionality in the future. Thus, I opted for it to remain as it is.