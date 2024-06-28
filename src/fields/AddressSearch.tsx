import {useField, useFormFields} from 'payload/components/forms'
import React, {useState} from 'react';

type AddressItem = {
    latitude: number,
    longitude: number,
    country: string,
    countryCode: string,
    county: string,
    city: string,
    postalCode: string,
    stateCode: string,
    street: string,
    formattedAddress: string,
    addressLabel: string
}

const AddressSuggestions = ({suggestions, handleAddressChange, suggestionIsShowing, setSuggestionIsShowing}: {
    suggestions: AddressItem[],
    handleAddressChange: (e: any, item: AddressItem) => void
    suggestionIsShowing: boolean,
    setSuggestionIsShowing: (isShowing: boolean) => void,
}) => {
    if (suggestions.length === 0) return <></>

    if (!suggestionIsShowing) {
        return <button onClick={()=>setSuggestionIsShowing(true)}>Show Suggestions</button>
    }

    return <div>
        <h4 className="address-search__h4">Set Address to:</h4>
        {
            suggestions.map((item) => {
                return <button className="address-search__suggestion" onClick={(e) => {
                    handleAddressChange(e, item)
                }}>{item.formattedAddress}</button>
            })
        }
    </div>
}

const AddressSearch: React.FC<{ path: string }> = ({path}) => {
    const {value, setValue} = useField<string>({path})
    const address = useFormFields(([fields, dispatch]) => {
        return (
            {
                field: fields["address.street"],
                dispatch: dispatch
            }
        );
    });

    const [suggestions, setSuggestions] = useState<AddressItem[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [showSuggestions, setShowSuggestions] = useState<boolean>(true);

    function handleAddressChange(e: any, addressItem: AddressItem) {
        e.preventDefault();
        address.dispatch({
            type: "UPDATE",
            path: "street",
            value: addressItem.addressLabel
        })
        address.dispatch({
            type: "UPDATE",
            path: "city",
            value: addressItem.city
        })
        address.dispatch({
            type: "UPDATE",
            path: "state",
            value: addressItem.stateCode
        })
        address.dispatch({
            type: "UPDATE",
            path: "zip",
            value: addressItem.postalCode
        })
        address.dispatch({
            type: "UPDATE",
            path: "latitude",
            value: addressItem.latitude
        })
        address.dispatch({
            type: "UPDATE",
            path: "longitude",
            value: addressItem.longitude
        })
        setShowSuggestions(false);
    }


    return <div className="address-search">
        <h2>Autofill Address</h2>
        <input onChange={(e) => setValue(e.target.value)} value={value}/>
        <button onClick={async (event) => {
            event.preventDefault();
            setIsLoading(true);
            const res = await fetch(`${process.env.PAYLOAD_PUBLIC_SERVER_URL}/api/listings/address-search`, {
                body: JSON.stringify({"address": value}),
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                method: "POST",
            });
            const json = await res.json();

            setIsLoading(false);
            setSuggestions(json.addresses);
        }
        }>Search
        </button>
        <div>
            {
                isLoading ?
                    <div className="lds-ring">
                        <div></div>
                        <div></div>
                        <div></div>
                        <div></div>
                    </div> :
                    <AddressSuggestions
                        suggestions={suggestions}
                        handleAddressChange={handleAddressChange}
                        suggestionIsShowing={showSuggestions}
                        setSuggestionIsShowing={setShowSuggestions}
                    />
            }
        </div>
    </div>
}

export default AddressSearch;
