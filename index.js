const Alexa = require('ask-sdk-core');
const text = require('./text.json');
const buttonDocument = require('./button.json');


const LaunchRequestHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'LaunchRequest';
    },
    handle(handlerInput) {
        const speakOutput = 'Welcome to the RAU Building, you can say, Show me a button';

        return handlerInput.responseBuilder
            .speak(speakOutput)
            .reprompt(speakOutput)
            .getResponse();
    }
};

// Tokens used when sending the APL directives
const WELCOME_TOKEN = 'text';

const HelloWorldIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'HelloWorldIntent';
    },
    handle(handlerInput) {
        let speakOutput = 'Hello World!';
        let responseBuilder = handlerInput.responseBuilder;
        if (Alexa.getSupportedInterfaces(handlerInput.requestEnvelope)['Alexa.Presentation.APL']){
            
            // Add the RenderDocument directive to the responseBuilder
            responseBuilder.addDirective({
                type: 'Alexa.Presentation.APL.RenderDocument',
                token: WELCOME_TOKEN,
                document: text
            });

            speakOutput += "I hope you can see the text on the Screen!"
        } else {
            speakOutput += "Please try this on a device with a screen, such as an Echo Show or Fire TV.";
        }
        return responseBuilder
            .speak(speakOutput)
            .getResponse();
    }
};

// Button Token
const BUTTON_TOKEN = 'ButtonToken';

// Button IntenT Handler

const ButtonIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'ButtonIntent';
    },
    handle(handlerInput){
        let speakOutput = "";
        let responseBuilder = handlerInput.responseBuilder;
        if (Alexa.getSupportedInterfaces(handlerInput.requestEnvelope)['Alexa.Presentation.APL']){
            
            // Add the RenderDocument directive to the responseBuilder
            responseBuilder.addDirective({
                type: 'Alexa.Presentation.APL.RenderDocument',
                token: BUTTON_TOKEN,
                document: buttonDocument,
            });
            
            // Tailor the speech for a device with a screen.
            speakOutput += "What Program are you looking for!"
        } else {
            speakOutput += " This example would be more interesting on a device with a screen, such as an Echo Show or Fire TV."
        }
        return responseBuilder
            .speak(speakOutput)
            //.reprompt('add a reprompt if you want to keep the session open for the user to respond')
            .getResponse();
    }
};


// Button Event Handler

const ButtonEventHandler = {
    canHandle(handlerInput){
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'Alexa.Presentation.APL.UserEvent'
            && (handlerInput.requestEnvelope.request.source.id.startsWith('fadeHelloTextButton') || 
                handlerInput.requestEnvelope.request.source.id.startsWith('questionButtonComponent') ||
                handlerInput.requestEnvelope.request.source.id.startsWith('question2_subbutton') ||
                handlerInput.requestEnvelope.request.source.id.startsWith('question3_subbutton'));
    },
    handle(handlerInput){
        const buttonId = handlerInput.requestEnvelope.request.source.id;
        let buttonMessage = "";
        let speakOutput = "";

        if(buttonId === 'fadeHelloTextButton') {
            buttonMessage = "Button 1 was pressed.";
            speakOutput = "Thank you for clicking the button. " + buttonMessage;
            return handlerInput.responseBuilder
                .speak(speakOutput)
                .getResponse();
        } else if(buttonId === 'fadeHelloTextButton2') {
            buttonMessage = "Button 2 was pressed.";
            speakOutput = "Thank you for clicking the button. " + buttonMessage;
            return handlerInput.responseBuilder
                .speak(speakOutput)
                .getResponse();
        } else if (buttonId === 'fadeHelloTextButton3') {
            buttonMessage = "Button 3 was pressed.";
            speakOutput = "Thank you for clicking the button. " + buttonMessage;
            return handlerInput.responseBuilder
                .speak(speakOutput)
                .getResponse();
        } else if (buttonId === 'questionButtonComponent1') {
            buttonMessage = "Button 4 was pressed.";
            speakOutput = "To navigate to staff members say 'Astro, guide me to 'name of place'" + buttonMessage;
            return handlerInput.responseBuilder
                .speak(speakOutput)
                .withShouldEndSession(true)
                .getResponse();
        } else if (buttonId === 'questionButtonComponent2') {
            buttonMessage = "Button 5 was pressed.";
            speakOutput = "To navigate say 'Astro, guide me to 'name of place. " + buttonMessage;
            return handlerInput.responseBuilder
                .speak(speakOutput)
                .getResponse();
        } else if (buttonId === 'questionButtonComponent3') {
            buttonMessage = "Button 6 was pressed.";
            speakOutput = "To navigate say 'Astro, guide me to 'name of place. " + buttonMessage;
            return handlerInput.responseBuilder
                .speak(speakOutput)
                .getResponse();
        } else if (buttonId === 'questionButtonComponent4') {
            buttonMessage = "Button 7 was pressed.";
            speakOutput = "To navigate say 'Astro, guide me to 'name of place. " + buttonMessage;
            return handlerInput.responseBuilder
                .speak(speakOutput)
                .getResponse();
        } else if (buttonId === 'question2_subbutton') {
            buttonMessage = "Button 8 was pressed.";
            speakOutput = "To navigate say 'Astro, guide me to 'name of place. " + buttonMessage;
            return handlerInput.responseBuilder
                .speak(speakOutput)
                .getResponse();
        } else if (buttonId === 'question3_subbutton1') {
            buttonMessage = "Button 9 was pressed.";
            speakOutput = "To navigate say 'Astro, guide me to 'name of place. " + buttonMessage;
            return handlerInput.responseBuilder
                .speak(speakOutput)
                .getResponse();
        } else if (buttonId === 'question3_subbutton2') {
            buttonMessage = "Button 10 was pressed.";
            speakOutput = "To navigate say 'Astro, guide me to 'name of place. " + buttonMessage;
            return handlerInput.responseBuilder
                .speak(speakOutput)
                .getResponse();
        } else {
            buttonMessage = "Unknown button was pressed.";
            speakOutput = "To navigate say 'Astro, guide me to 'name of place. " + buttonMessage;
            return handlerInput.responseBuilder
                .speak(speakOutput)
                .getResponse();
        }
    }
}



const HelpIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'AMAZON.HelpIntent';
    },
    handle(handlerInput) {
        const speakOutput = 'You can say hello to me! How can I help?';

        return handlerInput.responseBuilder
            .speak(speakOutput)
            .reprompt(speakOutput)
            .getResponse();
    }
};

const CancelAndStopIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && (Alexa.getIntentName(handlerInput.requestEnvelope) === 'AMAZON.CancelIntent'
                || Alexa.getIntentName(handlerInput.requestEnvelope) === 'AMAZON.StopIntent');
    },
    handle(handlerInput) {
        const speakOutput = 'Goodbye!';

        return handlerInput.responseBuilder
            .speak(speakOutput)
            .getResponse();
    }
};
/* *
 * FallbackIntent triggers when a customer says something that doesn’t map to any intents in your skill
 * It must also be defined in the language model (if the locale supports it)
 * This handler can be safely added but will be ingnored in locales that do not support it yet 
 * */
const FallbackIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'AMAZON.FallbackIntent';
    },
    handle(handlerInput) {
        const speakOutput = 'Sorry, I don\'t know about that. Please try again.';

        return handlerInput.responseBuilder
            .speak(speakOutput)
            .reprompt(speakOutput)
            .getResponse();
    }
};
/* *
 * SessionEndedRequest notifies that a session was ended. This handler will be triggered when a currently open 
 * session is closed for one of the following reasons: 1) The user says "exit" or "quit". 2) The user does not 
 * respond or says something that does not match an intent defined in your voice model. 3) An error occurs 
 * */
const SessionEndedRequestHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'SessionEndedRequest';
    },
    handle(handlerInput) {
        console.log(`~~~~ Session ended: ${JSON.stringify(handlerInput.requestEnvelope)}`);
        // Any cleanup logic goes here.
        return handlerInput.responseBuilder.getResponse(); // notice we send an empty response
    }
};
/* *
 * The intent reflector is used for interaction model testing and debugging.
 * It will simply repeat the intent the user said. You can create custom handlers for your intents 
 * by defining them above, then also adding them to the request handler chain below 
 * */
const IntentReflectorHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest';
    },
    handle(handlerInput) {
        const intentName = Alexa.getIntentName(handlerInput.requestEnvelope);
        const speakOutput = `You just triggered ${intentName}`;

        return handlerInput.responseBuilder
            .speak(speakOutput)
            //.reprompt('add a reprompt if you want to keep the session open for the user to respond')
            .getResponse();
    }
};
/**
 * Generic error handling to capture any syntax or routing errors. If you receive an error
 * stating the request handler chain is not found, you have not implemented a handler for
 * the intent being invoked or included it in the skill builder below 
 * */
const ErrorHandler = {
    canHandle() {
        return true;
    },
    handle(handlerInput, error) {
        const speakOutput = 'Sorry, I had trouble doing what you asked. Please try again.';
        console.log(`~~~~ Error handled: ${JSON.stringify(error)}`);

        return handlerInput.responseBuilder
            .speak(speakOutput)
            .reprompt(speakOutput)
            .getResponse();
    }
};

/**
 * This handler acts as the entry point for your skill, routing all request and response
 * payloads to the handlers above. Make sure any new handlers or interceptors you've
 * defined are included below. The order matters - they're processed top to bottom 
 * */
exports.handler = Alexa.SkillBuilders.custom()
    .addRequestHandlers(
        LaunchRequestHandler,
        HelloWorldIntentHandler,
        ButtonIntentHandler,
        ButtonEventHandler,
        HelpIntentHandler,
        CancelAndStopIntentHandler,
        FallbackIntentHandler,
        SessionEndedRequestHandler,
        IntentReflectorHandler)
    .addErrorHandlers(
        ErrorHandler)
    .withCustomUserAgent('sample/hello-world/v1.2')
    .lambda();