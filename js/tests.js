
// Put all tests inside the unitTests() function

var ut_unitTests = function(){

    // Run with custom values
    var testUnitTest = new unittest(
        testString = "a)/eide",
        expectedValue = "ἄειδε",
        docString = undefined,
        jqSelector = undefined,
        shouldFail = undefined // it defaults to false
    )
    $( testUnitTest.runTest() ).appendTo( $(testUnitTest.jqSelector) );

    // Can re-use the object
    testUnitTest.testString = "ἄειδε",
    $( testUnitTest.runTest() ).appendTo( $(testUnitTest.jqSelector) );

    // Test should-fail
    testUnitTest.testString = "ἄειδε";
    testUnitTest.shouldFail = true;
    $( testUnitTest.runTest() ).appendTo( $(testUnitTest.jqSelector) );

    /*
        Real tests begin here
    */

    // .resolve() tests

    var testBetaReader = new betareader();

    var resolutionTest = new unittest(
        testString = "a",
        expectedValue = "α",
        docString = "Testing betareader.resolve()",
        jqSelector = "#resolution_tests",
        shouldFail = false // it defaults to false        
    )

    resolutionTest.test = function(){
        this.result = testBetaReader.resolve(this.testString);
        this.testPassed = (this.expectedValue == this.result);
        this.success = getSuccessAnswer( this.testPassed, this.shouldFail);
    };

    resolutionTest.testString = "a";
    resolutionTest.expectedValue = "α";
    resolutionTest.docString = `Transcoding "${resolutionTest.testString}"`;
    $( resolutionTest.runTest() ).appendTo( $(resolutionTest.jqSelector) );

    resolutionTest.testString = "\\";
    resolutionTest.expectedValue = "\u0300";
    resolutionTest.docString = `Transcoding "${resolutionTest.testString}"`;
    $( resolutionTest.runTest() ).appendTo( $(resolutionTest.jqSelector) );

    resolutionTest.testString = "#18";
    resolutionTest.expectedValue = "\u003C";
    resolutionTest.docString = `Transcoding "${resolutionTest.testString}", reversed diple`;
    $( resolutionTest.runTest() ).appendTo( $(resolutionTest.jqSelector) );

    resolutionTest.testString = "J";
    resolutionTest.expectedValue = "❌";
    resolutionTest.docString = `Transcoding "${resolutionTest.testString}", bad character`;
    $( resolutionTest.runTest() ).appendTo( $(resolutionTest.jqSelector) );

    resolutionTest.testString = "@";
    resolutionTest.expectedValue = "❌";
    resolutionTest.docString = `Transcoding "${resolutionTest.testString}", bad character`;
    $( resolutionTest.runTest() ).appendTo( $(resolutionTest.jqSelector) );

    resolutionTest.testString = "%13";
    resolutionTest.expectedValue = "❌";
    resolutionTest.shouldFail = true;
    resolutionTest.docString = `Transcoding "${resolutionTest.testString}", double dagger`;
    $( resolutionTest.runTest() ).appendTo( $(resolutionTest.jqSelector) );

    resolutionTest.testString = "%133";
    resolutionTest.expectedValue = "❌";
    resolutionTest.shouldFail = false;
    resolutionTest.docString = `Transcoding "${resolutionTest.testString}", bad code`;
    $( resolutionTest.runTest() ).appendTo( $(resolutionTest.jqSelector) );


    // Preprocess beta-code capitals

    var preprocTest = new unittest(
        testString = "a",
        expectedValue = "a",
        docString = "Testing betareader.preprocssGreek()",
        jqSelector = "#preprocess_tests",
        shouldFail = false // it defaults to false        
    )

    preprocTest.test = function(){
        this.result = testBetaReader.preprocessGreek(this.testString);
        this.testPassed = (this.expectedValue == this.result);
        this.success = getSuccessAnswer( this.testPassed, this.shouldFail);
    };

    preprocTest.testString = "*)/a";
    preprocTest.expectedValue = "*a)/";
    preprocTest.docString = `Preprocessing "${preprocTest.testString}"`;
    $( preprocTest.runTest() ).appendTo( $(preprocTest.jqSelector) ); 
   
    preprocTest.testString = "*a";
    preprocTest.expectedValue = "*a";
    preprocTest.docString = `Preprocessing "${preprocTest.testString}"`;
    $( preprocTest.runTest() ).appendTo( $(preprocTest.jqSelector) ); 

    preprocTest.testString = "*)a";
    preprocTest.expectedValue = "*a)";
    preprocTest.docString = `Preprocessing "${preprocTest.testString}"`;
    $( preprocTest.runTest() ).appendTo( $(preprocTest.jqSelector) ); 

    preprocTest.testString = "*a)";
    preprocTest.expectedValue = "*a)";
    preprocTest.docString = `Preprocessing "${preprocTest.testString}"`;
    $( preprocTest.runTest() ).appendTo( $(preprocTest.jqSelector) ); 

    preprocTest.testString = "*)=a";
    preprocTest.expectedValue = "*a)=";
    preprocTest.docString = `Preprocessing "${preprocTest.testString}"`;
    $( preprocTest.runTest() ).appendTo( $(preprocTest.jqSelector) ); 

    preprocTest.testString = "*)=A";
    preprocTest.expectedValue = "*A)=";
    preprocTest.docString = `Preprocessing "${preprocTest.testString}"`;
    $( preprocTest.runTest() ).appendTo( $(preprocTest.jqSelector) ); 

    // The transcodeGreek iteration

    var transcodeGreekTest = new unittest(
        testString = "a)/eide qea/",
        expectedValue = "ἄειδε θεά",
        docString = "Testing betareader.transcodeGreek()",
        jqSelector = "#transcoder_tests",
        shouldFail = false // it defaults to false        
    )

    transcodeGreekTest.test = function(){
        this.result = testBetaReader.transcodeGreek(this.testString);
        this.testPassed = (this.expectedValue == this.result);
        this.success = getSuccessAnswer( this.testPassed, this.shouldFail);
    };

    transcodeGreekTest.testString = "a/";
    transcodeGreekTest.expectedValue = "ά" ;
    transcodeGreekTest.docString = `Transcoding "${transcodeGreekTest.testString}"`;
    $( transcodeGreekTest.runTest() ).appendTo( $(transcodeGreekTest.jqSelector) );  

    /**
     * 
     * Big test-suite can evolve here!
     * 
     */
    let bcTestSuite = [
        // Misc
        { bc: "a)/", uc: "ἄ" } ,
        { bc: "tw=|", uc: "τῷ" } ,
        { bc: "a?eide?", uc: "α̣ειδε̣" },
        { bc: "", uc: "" },
        { bc: "a/ e/ h/ i/ o/ u/ w/ A/ E/ H/ I/ O/ U/ W/ i/+ u/+", uc: "ά έ ή ί ό ύ ώ Ά Έ Ή Ί Ό Ύ Ώ ΐ ΰ"},
        { bc: "tw=| | th=|", uc: "τῷ | τῇ" },

        // Long

        { bc: "mh=nin a)/eide qea\\ *phlhi+a/dew *)axilh=os | ou)lome/nhn, h(\\ muri/' *)axaioi=s a)/lge' e)/qhke,", uc: "μῆνιν ἄειδε θεὰ Πηληϊάδεω Ἀχιλῆος | οὐλομένην, ἣ μυρί’ Ἀχαιοῖς ἄλγε’ ἔθηκε," },

        // consonants
        { bc: "b", uc: "β" }, 
        { bc: "g", uc: "γ" }, 
        { bc: "d", uc: "δ" }, 
        { bc: "z", uc: "ζ" }, 
        { bc: "q", uc: "θ" }, 
        { bc: "k", uc: "κ" }, 
        { bc: "l", uc: "λ" }, 
        { bc: "m", uc: "μ" }, 
        { bc: "n", uc: "ν" }, 
        { bc: "c", uc: "ξ" }, 
        { bc: "p", uc: "π" }, 
        { bc: "r", uc: "ρ" }, 
        { bc: "t", uc: "τ" }, 
        { bc: "f", uc: "φ" }, 
        { bc: "x", uc: "χ" }, 
        { bc: "y", uc: "ψ" }, 
        //vowels
        { bc: "a", uc: "α" },
        { bc: "e", uc: "ε" },
        { bc: "h", uc: "η" },
        { bc: "i", uc: "ι" },
        { bc: "o", uc: "ο" },
        { bc: "u", uc: "υ" },
        { bc: "w", uc: "ω" },
        // terminal sigma handled separately in Main.jl; the user shouldn't have to care
        { bc: "s", uc: "ς" },
        { bc: "ss", uc: "σς" },
        { bc: "as.", uc: "ας." },
        { bc: "ass", uc: "ασς" },
        { bc: "lu/s-w", uc: "λύσ-ω" }, // hyphen not terminator
        { bc: "lu/seis—lu/somen", uc: "λύσεις—λύσομεν" }, // em-dash is terminator

        // Capital letters of various kinds
        { bc: "*p", uc: "Π" }, 
        { bc: "*r", uc: "Ρ" }, 
        { bc: "*t", uc: "Τ" }, 
        { bc: "*f", uc: "Φ" }, 
        { bc: "X", uc: "Χ" }, 
        { bc: "U", uc: "Υ" }, 
        { bc: "A", uc: "Α" },
        { bc: "E", uc: "Ε" },

        // Archaic letters
        { bc: "v", uc: "ϝ" },// digamma LC
        { bc: "V", uc: "Ϝ" },// digamma UC
        { bc: "*v", uc: "Ϝ" },// digamma UC
        { bc: "#5", uc: "\u03E1" }, // sampi LC
        { bc: "*#5", uc: "\u03E0" }, // sampi UC
        { bc: "#711", uc: "\u03FB" },// san LC
        { bc: "*#711", uc: "\u03FA" },// san UC
        { bc: "#1", uc: "\u03DF" },// koppa UC
        { bc: "*#1", uc: "\u03DE" },// koppa LC

        // diacriticals
        { bc: "a(", uc: "ἁ" },
        { bc: "a)", uc: "ἀ" },
        { bc: "a\\", uc: "ὰ" },
        { bc: "a/", uc: "ά" },

        { bc: "a/", uc: "\u1F71" }, 
        { bc: "e/", uc: "\u1F73" }, 
        { bc: "h/", uc: "\u1F75" }, 
        { bc: "i/", uc: "\u1F77" }, 
        { bc: "o/", uc: "\u1F79" }, 
        { bc: "u/", uc: "\u1F7B" }, 
        { bc: "w/", uc: "\u1F7D" }, 
        { bc: "A/", uc: "\u1FBB" }, 
        { bc: "E/", uc: "\u1FC9" }, 
        { bc: "H/", uc: "\u1FCB" }, 
        { bc: "I/", uc: "\u1FDB" }, 
        { bc: "O/", uc: "\u1FF9" }, 
        { bc: "U/", uc: "\u1FEB" }, 
        { bc: "W/", uc: "\u1FFB" }, 

        { bc: "w=", uc: "ῶ" },
        { bc: "i+", uc: "ϊ" },
        { bc: "w(=|", uc: "ᾧ" },
        { bc: "*)/A", uc: "Ἄ" },
        { bc: "*A)/", uc: "Ἄ" },
        // dialytika
        { bc: "hi/+", uc: "η\u1FD3" }, // Should be an oxia: ΐ
        { bc: "hi+/", uc: "η\u1FD3" }, // Should be an oxia: ΐ
        { bc: "hi+=", uc: "η\u1FD7" }, 
        { bc: "hi=+", uc: "η\u1FD7" }, 
        { bc: "hi+\\", uc: "η\u1FD2" }, 
        { bc: "hi\\+", uc: "η\u1FD2" }, 
        { bc: "au/+", uc: "α\u1FE3" }, // Should be an oxia: ΰ
        { bc: "au+/", uc: "α\u1FE3" }, // Should be an oxia: ΰ
        { bc: "au+=", uc: "α\u1FE7" }, 
        { bc: "au=+", uc: "α\u1FE7" }, 
        { bc: "au+\\", uc: "α\u1FE2" }, 
        { bc: "au\\+", uc: "α\u1FE2" }, 
        
        // punctuation
        { bc: " ", uc: " " },
        { bc: ".", uc: "." },
        { bc: ",", uc: "," },
        { bc: ":", uc: "\u00b7" },
        { bc: ";", uc: ";" },
        { bc: "-", uc: "-" },
        { bc: "\n", uc: "\n" },
        { bc: "\t", uc: "\t" },
        { bc: "'", uc: "\u2019" },
        { bc: '\"', uc: '\"'},
        { bc: "_", uc: "—" },
        { bc: "—", uc: "—" },
        { bc: "–", uc: "–" },
        // Greek Numeral Sign
        { bc: "ia#", uc: "ια\u02b9"}, 
        { bc: "id#", uc: "ιδ\u02b9"}, 
        { bc: "kq#", uc: "κθ\u02b9"}, 
        { bc: "d#22", uc: "δ\u0375" }, //  Greek Lower Numeral Sign
        // archaic letters
        { bc: "#1", uc: "\u03DF" },
        { bc: "#2", uc: "\u03DB" },
        { bc: "#3", uc: "\u03D9" },
        { bc: "#4", uc: "\u03DE" },
        { bc: "#5", uc: "\u03E1" },
        { bc: "#400", uc: "\u0371" },
        // critical signs
        { bc: "#6", uc: "\u2E0F" },
        { bc: "#8", uc: "\u2E10" },
        { bc: "#9", uc: "\u0301" },
        { bc: "#10", uc: "\u03FD" },
        { bc: "#11", uc: "\u03FF" },
        { bc: "#12", uc: "\u2014" },
        { bc: "#13", uc: "\u203B" },
        { bc: "#14", uc: "\u2E16" },
        { bc: "#15", uc: "\u003E" },
        { bc: "#16", uc: "\u03FE" },
        { bc: "#17", uc: "\u002F" },
        { bc: "#18", uc: "\u003C" },
        { bc: "#19", uc: "\u0300" },

        { bc: "#74", uc: "⁝" }, // tricolon 



        { bc: "#53", uc: "\u205D" },
        { bc: "#150", uc: "\u221E" },
        { bc: "#310", uc: "\u2E0E" },
        { bc: "#465", uc: "\u2627" },
        { bc: "%", uc: "\u2020" },
        { bc: "%1", uc: "?" },
        { bc: "%5", uc: "\u007c" },
        { bc: "%17", uc: "\u2016" },
        { bc: "%40", uc: "\u23d1" },

        { bc: "%40", uc: "\u23d1" },
        { bc: "%41", uc: "\u2013" },
        { bc: "%42", uc: "\u23D5" },
        { bc: "%43", uc: "\u00D7" },
        { bc: "%44", uc: "\u23D2" },
        { bc: "%45", uc: "\u23D3" },
        { bc: "%46", uc: "\u23D4" },
        { bc: "%141", uc: "\u23D6" },

        { bc: "%13", uc: "\u2021" },
        { bc: "%158", uc: "\u2042" },
        { bc: "%163", uc: "\u00B6" },
        { bc: "a?b?", uc: "α\u0323β\u0323" },
        // Parentheses
        { bc: "[mh=nin]", uc: "[μῆνιν]" },
        { bc: "[1mh=nin]1", uc: "(μῆνιν)" },
        { bc: "[2mh=nin]2", uc: "\u3008μῆνιν\u3009" },
        { bc: "[3mh=nin]3", uc: "{μῆνιν}" },
        { bc: "{mh=nin}", uc: "{μῆνιν}" },
        { bc: "[4mh=nin]4", uc: "\u27E6μῆνιν\u27E7" },
    ];

    
   for (t in bcTestSuite ){
    transcodeGreekTest.testString = bcTestSuite[t].bc;
    transcodeGreekTest.expectedValue = bcTestSuite[t].uc;
    transcodeGreekTest.docString = `Transcoding "${transcodeGreekTest.testString}"`;
    $( transcodeGreekTest.runTest() ).appendTo( $(transcodeGreekTest.jqSelector) );  
   }
   

    /** 
    transcodeGreekTest.testString = "mh=nin a)/eide qea\\ *phlhi+a/dew *)axilh=os ";
    transcodeGreekTest.expectedValue = "μῆνιν ἄειδε θεὰ Πηληϊάδεω Ἀχιλῆος ";
    transcodeGreekTest.docString = `Transcoding "${transcodeGreekTest.testString}"`;
    $( transcodeGreekTest.runTest() ).appendTo( $(transcodeGreekTest.jqSelector) ); 

    // note String.raw`…` ! Allows basic backslash.
    transcodeGreekTest.testString = String.raw`mh=nin a)/eide qea\ Phlhi+a/dew *)axilh=os `;
    transcodeGreekTest.expectedValue = "μῆνιν ἄειδε θεὰ Πηληϊάδεω Ἀχιλῆος ";
    transcodeGreekTest.docString = `Transcoding "${transcodeGreekTest.testString}"`;
    $( transcodeGreekTest.runTest() ).appendTo( $(transcodeGreekTest.jqSelector) ); 

    transcodeGreekTest.testString = String.raw`*)atrei+/dhs te a)/nac a)ndrw=n kai\ di=os *)axilleu/s.`;
    transcodeGreekTest.expectedValue = "Ἀτρεΐδης τε ἄναξ ἀνδρῶν καὶ δῖος Ἀχιλλεύς.";
    transcodeGreekTest.docString = `Transcoding "${transcodeGreekTest.testString}"`;
    $( transcodeGreekTest.runTest() ).appendTo( $(transcodeGreekTest.jqSelector) ); 

    transcodeGreekTest.testString = String.raw`*)Atrei+/dhs te a)/nac a)ndrw=n kai\ di=os *)Axilleu/s.`;
    transcodeGreekTest.expectedValue = "Ἀτρεΐδης τε ἄναξ ἀνδρῶν καὶ δῖος Ἀχιλλεύς.";
    transcodeGreekTest.docString = `Transcoding "${transcodeGreekTest.testString}"`;
    $( transcodeGreekTest.runTest() ).appendTo( $(transcodeGreekTest.jqSelector) ); 

    transcodeGreekTest.testString = "xruse/w| a)na\\ skh/ptrw|, kai\\ li/sseto pa/ntas *)axaiou/s,";
    transcodeGreekTest.expectedValue = "χρυσέῳ ἀνὰ σκήπτρῳ, καὶ λίσσετο πάντας Ἀχαιούς,";
    transcodeGreekTest.docString = `Transcoding "${transcodeGreekTest.testString}"`;
    $( transcodeGreekTest.runTest() ).appendTo( $(transcodeGreekTest.jqSelector) ); 
    **/
    

   
};

