"use strict";
function ValidateForm(formElem)
{
	this.formElem = $(formElem);

	this.fieldCollection = [];
	this.validateSelection = [];
}

ValidateForm.prototype = {

	setValidation: function (field, validationtype)
	{
		var formElem = $(field);
		var selection = {'field': formElem, 'type': validationtype };

		this.validateSelection.push(selection);	
		this.fieldCollection.push(field);
	},
	init: function ()
	{
		var that = this;
		$(this.formElem).submit(function()
		{
			if(that.startValidation())
				return true;

			return false;	
		});
	},
	startValidation: function ()
	{
		var fieldSelection = this.validateSelection;
		var errorCollection = [];

		for(var i=0; i < fieldSelection.length; i++)
		{
			var validationtype = fieldSelection[i].type;
			var inputValue = $(this.fieldCollection[i]).val();
			var inputObj = this.fieldCollection[i];

			switch (validationtype){
				case 'email':
					errorCollection.push( this.checkEmail(inputValue, inputObj) );
					break;
				case 'required':
					errorCollection.push(this.checkRequired(inputValue, inputObj));
					break;
				case 'checkbox':
					errorCollection.push(this.checkCheckBox(inputObj));
					break;
				case 'select':
					errorCollection.push( this.checkSelect(inputValue, inputObj) );
					break;
			}
		}

		return this.validate(errorCollection);
	},
	validate: function (errorCollection)
	{
		if( jQuery.inArray(false, errorCollection) ==-1 )
			return true;

		return false;
	},
	checkCheckBox: function (inputObj)
	{
		var spanCheckboxElem = $(inputObj+' + label span');

		if(!validateCheckBox(inputObj)){
			this.addCheckboxErrorClass(spanCheckboxElem);
			alert('Aceptar terminos legales.');
			return false;
		}

		this.removeCheckboxErrorClass(spanCheckboxElem);
		return true;
	},
	addCheckboxErrorClass: function (spanElem)
	{
		spanElem.addClass('spanCheckBox-error');
	},
	removeCheckboxErrorClass: function (spanElem)
	{
		spanElem.removeClass('spanCheckBox-error');
	},
	checkEmail: function (value, inputObj)
	{
		if(!validateEmail(value)){
			this.addHTMLerrorClass(inputObj);
			$(inputObj).focus();
			return false;
		}

		this.removeHTLMerrorClass(inputObj);	
		return true;	
	},
	checkRequired: function (value, inputObj)
	{
		if(!validateRequired(value) ){
			this.addHTMLerrorClass(inputObj);
			$(inputObj).focus();
			return false;
		}

		this.removeHTLMerrorClass(inputObj);
		return true;
	},
	checkSelect: function (value, inputObj)
	{
		if(!validateRequired(value))
			return false;
		return true;
	},
	addHTMLerrorClass: function (inputObj)
	{
		$(inputObj).addClass('fv-error');
	},
	removeHTLMerrorClass: function (inputObj){
		$(inputObj).removeClass('fv-error');
	}
}


function validateCheckBox(inputObj)
{
	var checkboxState = $(inputObj).is(':checked');
	return checkboxState;
}

function validateEmail(email) 
{ 
    var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
}

function validateRequired(value)
{
	var value = $.trim(value);
	if(value == '')
		return false;

	return true;
}



