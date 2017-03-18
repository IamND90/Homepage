/**
 * Created by andreyparamonov on 18.03.17.
 */
'use strict'
;(function(window){

    function codeRun(terminal){
        this._init(terminal);
        this._start();
    }

    codeRun.prototype._init = function(){
        this.terminal = terminal;
        this.noOfNodes = 0;
        this.nextNode =0;
        this.nodesLimit = 12;
        this.paraText = ["java.lang.UnsupportedOperationException: This platform is not supported, yet.",
            "at com.sun.jna.platform.WindowUtils$NativeWindowUtils.getAllWindows(WindowUtils.java:659)",
            "at engine.EventController.fetch(EventController.java:43)",
            "Exception in thread ''main'' java.lang.RuntimeException: Exception in Application start method",
            "Exception in thread main java.lang.StackOverflowError \n at java.io.PrintStream.write(PrintStream.java:480) \n at sun.nio.cs.StreamEncoder.writeBytes(StreamEncoder.java:221)"
            ];
    };

    codeRun.prototype._start = function(){
        var self = this;
        (function animate(){
            //create a new p tag;
            self.pNode = document.createElement("p");

            //garbage collection
            if(self.noOfNodes > self.nodesLimit){
                self.terminal.removeChild(self.terminal.firstElementChild);
                --self.noOfNodes;
            }

            //append it to the div.i.e self.terminal
            self.terminal.appendChild(self.pNode);
            ++self.noOfNodes;
            var nodeToWork = self.pNode,
                text = self.paraText[self.nextNode],
                len = text.length,
                characters = text.split("");

            ++self.nextNode;
            if( self.nextNode >= self.paraText.length) self.nextNode =0;

            nodeToWork.innerHTML = "";
            (function animateWriting(charPos){
                self.terminal.scrollTop = self.terminal.scrollHeight;//trial and error.
                nodeToWork.innerHTML += characters[charPos++];
                if(charPos != len)
                    window.setTimeout(function(){
                        animateWriting(charPos);
                    }, 10);
                else{
                    // self.terminal.scrollTop = self.terminal.scrollHeight;
                    window.setTimeout(animate,300);
                }
            })(0);

        })();
    }

    window.codeRun = codeRun;
})(window);

var terminal = document.querySelector("#terminal-cover");
var codeRunObj = new codeRun(terminal);