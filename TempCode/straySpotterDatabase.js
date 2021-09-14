//database uploads - have an onclick handler for uploading the data
// Collection: Strays Found; Document: StrayProfile
// StrayProfile contains: Picture, Image Description, Notes, Location, Tags
// this assumes we've gotten past firestore being added to the project 


private DocumentReference strayDocRef = FirebaseFirestore.getInstance().collection("StraysFound").document("StrayProfile");

public void saveStrayProfile(View view){
	EditText imageDescriptionView = (EditText) findViewByID(R.id.editTextID)
	EditText notesTextView = (EditText) findViewByID(R.id.editTextNotes);
	EditText locationTextView = (EditText) findViewByID(R.id.locationText);
	
	String imageDescriptionText = imageDescriptionView.getText().toString();
	String notesText = notesTextView.getText().toString();
	String locationText = locationTextView.getText().toString();
	
	if(image.isEmpty() || strayType.isEmpty()) { return; }
	
	Map<String, Object> dataToSave = new HashMap<String, Object>();
	dataToSave.put("image description", imageDescriptionText);
	dataToSave.put("notes", notesText);
	dataToSave.put("location", locationText);
	strayDocRef.set(dataToSave).addOnSuccessListener(new OnSuccessListener<Void>(){
		@Override
		public void onSuccess(Void void){
			Log.d("StrayUpload", "Your upload has been saved!");	
		}
	}).addOnFailureListener(new OnFailureListener() {
		@Override
		public void onFailure(@NonNull Exception e){
			Log.w("StrayUpload", "Your upload was not saved. :(", e);
		}
	});
}

//database downloads
