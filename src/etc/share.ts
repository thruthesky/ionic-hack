export const ONE_MINUTE_STAMP = 60;
export const ONE_HOUR_STAMP = 3600;
export const ONE_DAY_STAMP = 86400;
export const ONE_WEEK_STAMP = 604800;
export const ONE_MONTH_STAMP = 2678400;



export interface FORM_PROCESS {
    loader?: boolean;
    error?: string;
    reset(): FORM_PROCESS ;
    startLoader(): FORM_PROCESS ;
    begin(): FORM_PROCESS;
    stopLoader(): FORM_PROCESS ;
    setError( message: string ) : FORM_PROCESS;
};

export let formProcess: FORM_PROCESS = {
    loader: false,
    error: '',
    reset: function() : FORM_PROCESS {
        this.loader = false;
        this.error = '';
        return this;
    },
    startLoader: function () : FORM_PROCESS {
        this.loader = true;
        this.error = '';
        return this;
    },
    begin: function() : FORM_PROCESS {
        return this.startLoader();
    },
    stopLoader: function() : FORM_PROCESS {
        this.loader = false;
        return this;
    },
    setError: function ( message: string ) : FORM_PROCESS {
        this.loader = false;
        this.error = message;
        return this;
    }
};

