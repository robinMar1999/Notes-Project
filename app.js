// node and third party modules 
const fs=require('fs');
const _=require('lodash');
const yargs=require('yargs');

// my created modules
const notes=require('./notes.js');

// main code
const titleOptions={
    describe: 'Title of note',
    demand: true,
    alias: 't'
}
const bodyOptions={
    describe: 'Body of note',
    demand: true,
    alias: 'b'
}
const argv=yargs
    .command('add','Add a new note',{
        title: titleOptions,
        body: bodyOptions
    })
    .command('list','List all notes')
    .command('read','Read a note',{
        title: titleOptions
    })
    .command('remove','Remove a note',{
        title: titleOptions
    })
    .help()
    .argv;
const command=argv._[0];
if(command==='add'){
    let note=notes.addNote(argv.title,argv.body);
    if(note===undefined){
        console.log('Note title already in use');
    } else{
        console.log('Note created successfully');
        notes.logNote(note);
    }
} else if(command==='list'){
    allNotes=notes.getAll();
    console.log(`Printing ${allNotes.length} notes:`);
    allNotes.forEach(note => {
        notes.logNote(note);
    });
} else if(command==='read'){
    let note=notes.getNote(argv.title);
    if(note){
        console.log('Note found');
        notes.logNote(note);
    } else{
        console.log('Note not found');
    }
} else if(command==='remove'){
    let removed=notes.removeNote(argv.title);
    if(removed){
        console.log('Note removed successfully');
    } else{
        console.log('Note not found');
    }
} else{
    console.log('Command not recognized!');
}
