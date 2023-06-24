import Step from "@/Pages/Records/Partials/Step.jsx";
import Icon from "@/Components/Icon.jsx";

export default ({ step }) => {
    return (
        <div className="flex flex-col sm:justify-center items-center">
            <ol className="flex items-center w-full mb-4 sm:mb-5">
                <Step
                    passed={ step > 1 }
                    active={ step === 1 }
                    icon={
                        <Icon type="fill">
                            <path d="M4 4a2 2 0 00-2 2v1h16V6a2 2 0 00-2-2H4z" />
                            <path d="M18 9H2v5a2 2 0 002 2h12a2 2 0 002-2V9zM4 13a1 1 0 011-1h1a1 1 0 110 2H5a1 1 0 01-1-1zm5-1a1 1 0 100 2h1a1 1 0 100-2H9z" />
                        </Icon>
                    }
                />
                <Step iconType="fill"
                    passed={ step > 2 }
                    active={ step === 2 }
                    icon={
                      <Icon type="fill">
                          <path d="M4 4a2 2 0 00-2 2v1h16V6a2 2 0 00-2-2H4z" />
                          <path d="M18 9H2v5a2 2 0 002 2h12a2 2 0 002-2V9zM4 13a1 1 0 011-1h1a1 1 0 110 2H5a1 1 0 01-1-1zm5-1a1 1 0 100 2h1a1 1 0 100-2H9z" />
                      </Icon>
                    }
                />
                <Step
                    passed={ step > 3 }
                    active={ step === 3 }
                    icon={
                      <Icon type="fill">
                          <path d="M4 4a2 2 0 00-2 2v1h16V6a2 2 0 00-2-2H4z" />
                          <path d="M18 9H2v5a2 2 0 002 2h12a2 2 0 002-2V9zM4 13a1 1 0 011-1h1a1 1 0 110 2H5a1 1 0 01-1-1zm5-1a1 1 0 100 2h1a1 1 0 100-2H9z" />
                      </Icon>
                    }
                />
                <Step last
                    active={ step === 4 }
                    icon={
                      <Icon type="fill">
                          <path d="M4 4a2 2 0 00-2 2v1h16V6a2 2 0 00-2-2H4z" />
                          <path d="M18 9H2v5a2 2 0 002 2h12a2 2 0 002-2V9zM4 13a1 1 0 011-1h1a1 1 0 110 2H5a1 1 0 01-1-1zm5-1a1 1 0 100 2h1a1 1 0 100-2H9z" />
                      </Icon>
                    }
                />
            </ol>
        </div>
    );
}
