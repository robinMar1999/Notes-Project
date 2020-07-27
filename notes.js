const fs=require('fs');
const { sortedUniq } = require('lodash');
let fetchNotes=()=>{
    let notes;
    try{
        let notesString=fs.readFileSync('notes-data.json');
        notes=JSON.parse(notesString);
    } catch(err){
        notes=[];
    } finally{
        return notes;
    }
};
let saveNotes=(notes)=>{
    fs.writeFileSync('notes-data.json',JSON.stringify(notes));
};
let addNote=(title,body)=>{
    let notes=fetchNotes();
    let duplicateNotes=notes.filter((note)=>note.title===title);
    let note={
        title,
        body
    };
    if(duplicateNotes.length===0){
        notes.push(note);
        saveNotes(notes);
        return note;
    }
    
};
let getAll=()=>{
    let notes=fetchNotes();
    return notes;
}
let getNote=(title)=>{
    let notes=fetchNotes();
    let noteFound;
    notes.forEach(note=>{
        if(note.title===title){
            noteFound=note;
        }
    });
    return noteFound;
}
let removeNote=(title)=>{
    let notes=fetchNotes();
    let filteredNotes=notes.filter((note)=>note.title!==title);
    saveNotes(filteredNotes);
    return filteredNotes.length!==notes.length;
}
let logNote=(note)=>{
    console.log('---');
    console.log(`Title: ${note.title}`);
    console.log(`Body: ${note.body}`);
}
module.exports={
    addNote,
    getAll,
    getNote,
    removeNote,
    logNote
};
